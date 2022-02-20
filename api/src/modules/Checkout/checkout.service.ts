import {Injectable, Scope, Inject, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import common from '@golpasal/common';
import AlipaySdk from 'alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';
import fs from 'fs';
import path from 'path';

import {BadRequestException} from 'src/core';
import {BaseCRUDService} from 'src/core/layers';

import {Orchestrator} from 'src/lib/orchestrator';

// interfaces & models
import {
  CheckoutCreateModel,
  CheckoutUpdateModel,
  CheckoutSearchModel,
  CheckoutOrderModel,
  CheckoutFinalizeModel
} from './models';
import {Checkout, CheckoutModel} from './interfaces';

import {Order} from '../Order/interfaces';
import {OrderService} from '../Order/order.service';
import {Payment} from '../Payment/interfaces';
import {InvoiceService} from '../Invoice/invoice.service';
import {AWSSQSService} from '../Aws/aws.sqs.service';
import {PaymentService} from '../Payment/payment.service';
import {WalletBankCardService} from '../Wallet/WalletBankCard/walletBankCard.service';
// eslint-disable-next-line max-len
import {WorkspacePaymentMethodService} from '../Workspace/submodules/WorkspacePaymentMethod/workspacePaymentMethod.service';
import {PaymentMethod as IPaymentMethod} from '../PaymentMethod/interfaces';
import {ShoppingCartService} from '../ShoppingCart/shoppingCart.service';
import {IUser} from '../User';
import {AutoNumberService} from '../AutoNumber/autoNumber.service';

const {
  OrderStatus,
  PaymentStatus,
  CheckoutStatus,
  PaymentTransactionStatus
} = common.status;
const {PaymentMethod} = common.method;

@Injectable({scope: Scope.REQUEST})
export class CheckoutService extends BaseCRUDService<
  Checkout,
  CheckoutCreateModel,
  CheckoutUpdateModel,
  CheckoutSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Checkouts')
    private readonly checkoutRepository: CheckoutModel,
    private readonly sqsService: AWSSQSService,
    private readonly invoiceService: InvoiceService,
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly walletBankCardService: WalletBankCardService,
    private readonly autoNumberService: AutoNumberService,
    private readonly workspacePaymentMethodService: WorkspacePaymentMethodService
  ) {
    super(checkoutRepository, request);
  }

  public _castQuery(searchModel: CheckoutSearchModel) {
    const query: any = {};
    const {order} = searchModel;

    if (order) {
      query.order = order;
    }

    return query;
  }

  /**
   * checkout cart to create order and handle payment
   *
   * @param checkoutOrderModel checkout form from frontend
   * @param options checkout options
   */
  public async checkout(
    checkoutOrderModel: CheckoutOrderModel,
    options: {finalize?: boolean; expireIn?: number}
  ): Promise<Checkout> {
    options = {
      finalize: false,
      // default expir;e in 1 day
      expireIn: 86400000,
      ...options
    };

    // create new orchestrator
    const orchestrator = new Orchestrator<{
      checkoutOrderModel?: CheckoutOrderModel;
      checkout?: Checkout;
      finalize?: boolean;
      productInventoryLogs?: string[];
      order?: Order;
      payment?: Payment;
      expireIn?: number;
    }>({...options, checkoutOrderModel});

    // Step 1: reserve intentory
    // TODO: product inventory log

    // Step 2: create order
    orchestrator.conduct(
      async () => {
        let order;
        if (checkoutOrderModel.orderId) {
          // check any existing checkout with this order
          const checkouts = await this.find(
            {order: checkoutOrderModel.orderId},
            {lean: true, populates: ['payment']}
          );

          if (
            checkouts.find(
              checkout =>
                checkout.status === CheckoutStatus.COMPLETED &&
                (checkout.payment as Payment).status === PaymentStatus.PAID
            )
          ) {
            // order payment settled already, throw error
            throw new BadRequestException({code: 'err_payment_settled'});
          }

          if (checkouts.length > 0) {
            // change all PENDING to CANCELLED
            await this.checkoutRepository
              .updateMany(
                {
                  order: checkoutOrderModel.orderId,
                  status: CheckoutStatus.PENDING
                },
                {status: CheckoutStatus.CANCELLED}
              )
              .session(this.getMongoSession())
              .exec();
          }

          // get order by id
          order = await this.orderService.findById(checkoutOrderModel.orderId);
          if (!order) {
            throw new NotFoundException({code: 'err_page_not_found'});
          }
        } else {
          order = await this.orderService.createOrder({
            ...checkoutOrderModel.order,
            paymentMethod: checkoutOrderModel.payment?.paymentMethod
          });
        }

        return {order};
      },
      async ({order}) => {
        await this.orderService.cancelOrder(order._id.toHexString());
      }
    );

    // Step 3: create payment
    orchestrator.conduct(
      async bag => {
        let payment: Payment = await this.paymentService.findOne(
          {
            order: bag.order._id.toHexString()
          },
          {lean: true}
        );

        if (payment) {
          // order payment already exists
          return {payment};
        }

        // create new payment for the order
        payment = await this.paymentService.create({
          order: bag.order._id.toHexString()
        });

        return {payment};
      },
      async ({payment}) => {
        await this.paymentService.delete(payment._id);
      }
    );

    // Step 4: create checkout
    orchestrator.conduct(
      async ({order, expireIn, payment}) => {
        const checkout = await this.create({
          order: order._id.toHexString(),
          payment: payment._id.toHexString(),
          expireAt: new Date(Date.now() + expireIn)
        });

        return {checkout};
      },
      async ({checkout}) => {
        await this.update(checkout._id, {status: CheckoutStatus.FAILED});
      }
    );

    // Step 5: finalize payment
    orchestrator.conduct(async ({finalize, checkout, order, payment}) => {
      if (finalize) {
        return {
          checkout: await this.finalize(
            checkout,
            {
              sourceId: checkoutOrderModel.payment.sourceId,
              paymentMethod: checkoutOrderModel.payment.paymentMethod
            },
            {order, payment}
          )
        };
      }
    });

    // Step 6: clear cart items (irreversible)
    orchestrator.conduct(async () => {
      const product = checkoutOrderModel.order?.product;

      if (product) {
        const productSKUIds = product.items.map(item => item.productSKU);

        await this.shoppingCartService.removeItemsByProsuctSKU(productSKUIds);
      }

      return {};
    });

    // exec orchestrator
    const {checkout} = await orchestrator.start();

    return checkout;
  }

  /**
   * finalize the checkout payment
   *
   * @param _checkout checkout document or it's _id
   * @param checkoutPayment finalize model
   * @param options order/payment document
   */
  public async finalize(
    _checkout: Checkout | string,
    checkoutPayment?: CheckoutFinalizeModel,
    options?: {order?: Order; payment?: Payment}
  ) {
    let order: Order;
    let payment: Payment;
    let workspace: string;
    let checkout: Checkout;
    let transactionId: string;
    const user = this.getCurrentUser<IUser>();

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else {
      workspace = this.getHeaderWorkspace();
    }

    checkout =
      typeof _checkout === 'string'
        ? await this.findById(_checkout, {lean: true})
        : _checkout;

    if (checkout.status === CheckoutStatus.COMPLETED) {
      // order payment settled already, throw error
      throw new BadRequestException({code: 'err_payment_settled'});
    }

    if (checkout.expireAt.getTime() < Date.now()) {
      // checkout expired
      // REMARK: skip transaction here, otherwise cannot update
      this.checkoutRepository
        .findByIdAndUpdate(checkout._id, {status: CheckoutStatus.FAILED})
        .exec();

      throw new BadRequestException({code: 'err_checkout_expired'});
    }

    // get order
    if (options?.order) {
      order = options.order;
    } else {
      // populate from checkout
      const populatedCheckout = await this._populate(checkout, ['order']);
      order = populatedCheckout.order as Order;
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException({code: 'err_order_has_been_cancelled'});
    }

    // generate receipt no.
    const receiptNo = await this.autoNumberService.generate({
      type: 'receipt',
      date: new Date(),
      workspace: workspace.toString()
    });

    // get payment
    if (options?.payment) {
      payment = options.payment;
    } else {
      const populatedCheckout = await this._populate(checkout, ['payment']);
      payment = populatedCheckout.payment as Payment;
    }

    if (payment.status === PaymentStatus.PAID) {
      throw new BadRequestException({code: 'err_payment_already_settled'});
    }

    // get all payment methods for the given workspace
    const workspacePaymentMethods = await this.workspacePaymentMethodService.find(
      {workspace, isActive: true},
      {lean: true, populates: ['paymentMethod']}
    );

    // handle payment here
    switch (checkoutPayment.paymentMethod) {
      case PaymentMethod.CREDIT_CARD_STRIPE:
        const method = workspacePaymentMethods.find(
          w =>
            (w.paymentMethod as IPaymentMethod).code ===
            PaymentMethod.CREDIT_CARD_STRIPE
        );
        if (!method) {
          // throw error here
          new NotFoundException({code: 'err_paymentMethod_not_found'});
        }
        // charge card with stripe
        /*
          amount base on outstanding payment (not paid),
          i.e. order.charge.totalAmount - sum(payment.transactions.filter(t => t.status === PAID))
        */
        const pendingOrSettledAmount = payment.transactions.reduce(
          (prev, cur) =>
            prev +
            (cur.status !== PaymentTransactionStatus.FAILED ? cur.amount : 0),
          0
        );
        const pendingAmount = payment.transactions.reduce(
          (prev, cur) =>
            prev +
            (cur.status === PaymentTransactionStatus.PENDING ? cur.amount : 0),
          0
        );
        const amountToSettle =
          order.charge.totalAmount - pendingOrSettledAmount;
        const chargeResult = await this.walletBankCardService.chargeCard({
          chargeImmediately: true,
          enforcePositiveBalance: false,
          currency: order.charge.currency,
          amount: amountToSettle,
          stripeKey: method.credential.secretKey,
          sourceId: checkoutPayment.sourceId,
          description: `Order ${order.orderNo}`
        });

        // update payment status
        await this.paymentService.update(payment._id, {
          status:
            pendingAmount <= 0 ? PaymentStatus.PAID : PaymentStatus.PARTIAL,
          $push: {
            transactions: {
              id: chargeResult.id,
              receiptNo: receiptNo,
              _paymentMethod: PaymentMethod.CREDIT_CARD_STRIPE,
              amount: amountToSettle,
              status: PaymentTransactionStatus.SUCCESS
            }
          }
        });

        // update order status
        await this.orderService.updateOrderStatus(
          order,
          pendingAmount <= 0
            ? OrderStatus.PREPARE_SHIPMENT
            : OrderStatus.PENDING_PAYMENT
        );

        // update checkout status
        checkout = await this.update(checkout._id, {
          status:
            pendingAmount <= 0
              ? CheckoutStatus.COMPLETED
              : CheckoutStatus.PENDING
        });
        break;
      case PaymentMethod.CASH_ON_DELIVERY:
        // extend checkout expiry, let's extends to 1 year first
        checkout = await this.update(checkout._id, {
          expireAt: new Date(Date.now() + 31536000000)
        });
        break;
      case PaymentMethod.ATM:
      case PaymentMethod.PAYPAL:
      case PaymentMethod.UNION_PAY:
        // for above cases of paymentMethods
        // currently do nothing on above cases
        break;
      case 'default':
        // by default does nothing
        break;
    }

    // send order invoice
    if (checkout.status === CheckoutStatus.COMPLETED) {
      if (process.env.QUEUE_ENABLE === 'true') {
        const url = `${process.env.HOST_API}${
          process.env.HOST_API_USE_PORT === 'true' ? ':' + process.env.PORT : ''
        }/invoices/${order._id}/notification/${receiptNo}`;

        await this.sqsService.sendMessage({}, {url, method: 'post'}, 30);
      } else {
        await this.invoiceService.sendOrderCreateNotification(
          order._id.toHexString(),
          receiptNo
        );
      }
    }

    return checkout;
  }

  /**
   * @param checkoutOrderModel: CheckoutOrderModel
   */
  public async alipay(checkoutOrderModel: CheckoutOrderModel) {
    // get the paymenthod
    const workspacePaymentMethod = await this.workspacePaymentMethodService.findOne(
      {
        platform: common.type.PlatformType.WEB,
        paymentMethod: checkoutOrderModel.payment.paymentMethod
      },
      {lean: true, populates: ['paymentMethod']}
    );

    let order;
    if (checkoutOrderModel.orderId) {
      // check any existing checkout with this order
      const checkouts = await this.find(
        {order: checkoutOrderModel.orderId},
        {lean: true, populates: ['payment']}
      );

      if (
        checkouts.find(
          checkout =>
            checkout.status === CheckoutStatus.COMPLETED &&
            (checkout.payment as Payment).status === PaymentStatus.PAID
        )
      ) {
        // order payment settled already, throw error
        throw new BadRequestException({code: 'err_payment_settled'});
      }

      if (checkouts.length > 0) {
        // change all PENDING to CANCELLED
        await this.checkoutRepository
          .updateMany(
            {
              order: checkoutOrderModel.orderId,
              status: CheckoutStatus.PENDING
            },
            {status: CheckoutStatus.CANCELLED}
          )
          .session(this.getMongoSession())
          .exec();
      }

      // get order by id
      order = await this.orderService.findById(checkoutOrderModel.orderId);
      if (!order) {
        throw new NotFoundException({code: 'err_page_not_found'});
      }
    } else {
      order = await this.orderService.createOrder({
        ...checkoutOrderModel.order,
        paymentMethod: checkoutOrderModel.payment?.paymentMethod
      });
    }
    const alipaySdk = new AlipaySdk({
      alipayPublicKey: fs.readFileSync(
        path.join(__dirname + '/alipayKeys/public_key.txt'),
        'ascii'
      ),
      privateKey: fs.readFileSync(
        path.join(__dirname + '/alipayKeys/private_key.txt'),
        'ascii'
      ),
      appId: workspacePaymentMethod?.credential?.appId,
      signType: workspacePaymentMethod?.credential?.signType,
      gateway: workspacePaymentMethod?.credential?.gatewayUri,
      timeout: workspacePaymentMethod?.credential?.timeout,
      charset: workspacePaymentMethod?.credential?.charset
    });
    const bizContent = {
      out_trade_no: order._id.toString(),
      product_code: order?.orderNo,
      total_amount: order?.charge.totalAmount,
      subject: order.orderNo,
      timeout_express: workspacePaymentMethod?.credential?.timeout_express
    };
    const formData = new AlipayFormData();
    formData.addField('bizContent', bizContent);
    const result = await alipaySdk.exec(
      workspacePaymentMethod?.credential?.method,
      {},
      {
        formData: formData
      }
    );
    return result;
  }
}
