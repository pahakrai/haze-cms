import {Injectable, Scope, Inject, HttpService} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import common from '@golpasal/common';
import {ObjectId} from 'mongodb';

import {BadRequestException, BaseCRUDService} from 'src/core';

// interfaces & models
import {
  PaymentCreateModel,
  PaymentUpdateModel,
  PaymentSearchModel,
  PaymentTransactionModel
} from './models';
import {PaymentModel, Payment} from './interfaces';
import {AutoNumberService} from '../AutoNumber/autoNumber.service';
import {BlobService} from '../File/Blob/blob.service';
import {IUser} from '../User';
import {Order} from '../Order/interfaces';
import {OrderService} from '../Order/order.service';
import {OrderProductService} from '../Order/submodules/OrderProduct/orderProduct.service';
import {NotificationService} from '../Notification/notification.service';
import {WorkspaceService} from '../Workspace/workspace.service';
import {UserService} from '../User/user.service';

const {PaymentStatus, PaymentTransactionStatus, OrderStatus} = common.status;
const {
  AmountType,
  PushNotificationMerchantScreenType,
  IntegrationAppType,
  TransactionType
} = common.type;

@Injectable({scope: Scope.REQUEST})
export class PaymentService extends BaseCRUDService<
  Payment,
  PaymentCreateModel,
  PaymentUpdateModel,
  PaymentSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Payments') private readonly paymentRepository: PaymentModel,
    private readonly autoNumberService: AutoNumberService,
    private readonly blobService: BlobService,
    private readonly orderService: OrderService,
    private readonly orderProductService: OrderProductService,
    private readonly notificationService: NotificationService,
    private readonly workspaceService: WorkspaceService,
    private readonly userService: UserService,
    private readonly httpService: HttpService
  ) {
    super(paymentRepository, request);
  }

  public _castQuery(searchModel: PaymentSearchModel) {
    const query: any = {};
    const {q, order} = searchModel;

    if (q) {
    }
    if (order) {
      query.order = order;
    }

    return query;
  }

  /**
   * append new transaction for existing payment
   *
   * @param _id payment _id
   * @param transaction new transaction
   */
  public async appendTransaction(
    _id: string | ObjectId,
    transaction: PaymentTransactionModel,
    files?: Express.Multer.File[]
  ) {
    let fileMetaIds: string[] = transaction?.files ? transaction.files : [];
    const user = this.getCurrentUser<IUser>();

    // get payment
    const payment = await this.findById(_id, {
      lean: true,
      populates: ['order']
    });
    // upload files if applicable
    if (files?.length > 0) {
      const fileMetas = await this.blobService.uploadFiles(
        files,
        `${
          process.env.BLOB_UPLOAD_IMAGE_FOLDER
        }/${user.currentWorkspace.toHexString()}`
      );

      fileMetaIds = [
        ...fileMetaIds,
        ...fileMetas.map(f => (f._id as ObjectId).toString())
      ];
    }

    const order = payment.order as Order;

    // Calculate the total amount paid
    const transactionAmount = payment.transactions.reduce(
      (prev, cur) =>
        prev +
        (cur.status !== PaymentTransactionStatus.FAILED ? cur.amount : 0),
      0
    );

    //  order charge totalAmount - Amount paid < Amount of this payment
    if (order?.charge?.totalAmount - transactionAmount < transaction?.amount) {
      throw new BadRequestException({
        code: 'err_payment_amount_limit',
        payload: {
          amount: transaction.amount,
          balance: order?.charge?.totalAmount - transactionAmount
        }
      });
    }

    // generate receipt no.
    const receiptNo = await this.autoNumberService.generate({
      type: 'receipt',
      date: new Date(),
      workspace: user.currentWorkspace.toHexString()
    });
    let isPaid = false;
    isPaid =
      order?.charge?.totalAmount - transactionAmount - transaction.amount === 0
        ? true
        : false;
    let status = payment.status;

    // find  record on transactions  includes status == pending
    const isPending = payment.transactions
      .map(t => t.status)
      .includes(PaymentTransactionStatus.PENDING);

    // find  record on transactions  includes status == success
    const isSuccess = payment.transactions
      .map(t => t.status)
      .includes(PaymentTransactionStatus.SUCCESS);

    // if no have pending record
    if (!isPending) {
      // if new transaction status  == pending and all record not only status = pending
      if (
        (transaction.status === PaymentTransactionStatus.PENDING &&
          isSuccess) ||
        (transaction.status === PaymentTransactionStatus.SUCCESS && !isPaid)
      ) {
        status = PaymentStatus.PARTIAL;
      }
      // if new transaction status = success and  paid amount = order.charge.totalAmount
      if (transaction.status === PaymentTransactionStatus.SUCCESS && isPaid) {
        status = PaymentStatus.PAID;
      }
    }
    // if have pending record  and new transaction status = success, will update payment status = PARTIAL
    if (isPending && transaction.status === PaymentTransactionStatus.SUCCESS) {
      status = PaymentStatus.PARTIAL;
    }

    // update payment with new transaction
    const promiseList = [];
    promiseList.push(
      this.update(_id, {
        status: status,
        $push: {
          transactions: {
            id: transaction.id,
            receiptNo: receiptNo,
            date: new Date(),
            files: fileMetaIds,
            _paymentMethod: transaction._paymentMethod,
            // default as order total amount (full payment)
            amount:
              transaction.amount ||
              (payment.order as Order)?.charge?.totalAmount,
            status: transaction.status || PaymentTransactionStatus.PENDING
          }
        }
      })
    );
    const workspace = await this.workspaceService.findById(
      order.workspace.toString()
    );

    if (status === PaymentStatus.PAID) {
      promiseList.push(
        this.orderService.updateOrderStatus(order, OrderStatus.PREPARE_SHIPMENT)
      );
    }

    if (
      [
        PaymentTransactionStatus.FAILED,
        PaymentTransactionStatus.SUCCESS
      ].includes(transaction.status)
    ) {
      if (
        workspace?.preferences?.pushNotification?.paymenTransactionStatusUpdate
      ) {
        const toUser = await this.userService.findById(order.client.toString());
        const locale = this.getLocale();
        promiseList.push(
          this.sendPaymentPushNotification(
            toUser,
            locale.tAll('msg_payment_transaction_title'),
            locale.tAll(
              transaction.status === PaymentTransactionStatus.SUCCESS
                ? 'msg_payment_transaction_success'
                : 'msg_payment_transaction_fail',
              [`${order?.charge?.currency} ${transaction.amount.toString()}`]
            ),
            {
              screen: PushNotificationMerchantScreenType.TOPUP_DETAIL,
              parameters: {
                _id: order?._id
              }
            }
          )
        );
      }
    }

    const [paymentResult] = await Promise.all(promiseList);
    // if payment status === paid workspace integrations have  code is = add_credit
    if (
      paymentResult.status === PaymentStatus.PAID &&
      workspace?.integrations.length > 0
    ) {
      const hook = workspace?.integrations
        .find(i => i.app === IntegrationAppType.CUSTOMIZE)
        ?.hooks?.find(h => h.code === 'add_credit');
      if (hook) {
        const toUser = await this.userService.findById(order.client.toString());
        const locale = this.getLocale();
        let orderProducts = await this.orderProductService.find({
          order: (order._id as ObjectId).toString()
        });
        orderProducts = await this.orderProductService._populate(
          orderProducts,
          ['$items.product', '$items.productSKU']
        );
        let creditAmount = 0;
        orderProducts.forEach(op =>
          op.items.forEach(item => {
            creditAmount += item?.amount * item?.qty;
          })
        );
        await this.createUserCredit(
          workspace?._id.toHexString(),
          hook,
          order?.client,
          creditAmount
        );
        await this.sendPaymentPushNotification(
          toUser,
          locale.tAll('msg_credit_add_success', [creditAmount.toString()]),
          {},
          {
            screen: PushNotificationMerchantScreenType.TOPUP_DETAIL,
            parameters: {
              _id: order?._id
            }
          }
        );
      }
    }
    return paymentResult;
  }

  /**
   * admin approve an transaction
   *
   * @param _id payment id
   * @param transactionId payment transaction id
   */
  public async approveTransaction(_id: string, transactionId: string) {
    // get payment
    const payment = await this.findById(_id, {
      lean: true,
      populates: ['order']
    });

    // check wtether payment is full-paid
    let newPaymentStatus;
    if (
      (payment.order as Order)?.charge?.totalAmount ===
      payment.transactions.find(
        t => (t._id as ObjectId).toHexString() === transactionId
      ).amount
    ) {
      // full paid
      newPaymentStatus = PaymentStatus.PAID;

      // update order status
      await this.orderService.updateOrderStatus(
        payment.order as Order,
        OrderStatus.PREPARE_SHIPMENT
      );
    } else {
      // partial paid
      newPaymentStatus = PaymentStatus.PARTIAL;
    }

    // update payment
    return this.paymentRepository
      .findOneAndUpdate(
        {
          _id,
          'transactions._id': transactionId
        },
        {
          status: newPaymentStatus,
          'transactions.$.status': PaymentTransactionStatus.SUCCESS
        },
        {new: true}
      )
      .lean()
      .populate('order')
      .exec();
  }

  /**
   * admin decline an transaction
   *
   * @param _id payment id
   * @param transactionId payment transaction id
   */
  public async declineTransaction(_id: string, transactionId: string) {
    return this.paymentRepository.findOneAndUpdate(
      {_id, 'transactions._id': transactionId},
      {'transactions.$.status': PaymentTransactionStatus.FAILED}
    );
  }

  /**
   *
   * @param _id payment id
   * @param transactionId transaction id
   * @param model update model
   */
  public async updateTransaction(
    _id: string,
    transactionId: string,
    model: PaymentTransactionModel,
    files?: Express.Multer.File[]
  ) {
    const user = this.getCurrentUser<IUser>();

    // get payment
    const payment = await this.findById(_id, {
      lean: true,
      populates: ['order']
    });

    const updatedModel = {...model};
    const prevFiles =
      payment?.transactions?.find(
        t => (t._id as ObjectId).toString() === transactionId
      )?.files || [];
    const fileIds = (prevFiles || [])?.map(f => f.toHexString()) || [];
    if (model?.files) {
      // file managing section
      const notIncludedFileIds =
        model.files.length > 0 && fileIds.length > 0
          ? fileIds.map(id => model?.files?.includes(id))
          : [];
      if (notIncludedFileIds.length > 0) {
        // TO DO: Remove notIncludedFileIds
      }
      updatedModel.files = [...model.files];
    } else {
      updatedModel.files = [
        ...new Set([
          // if uploaded on the frontend and only ids are sent
          ...(model?.files ? model.files : []),
          // previous file ids
          ...fileIds
        ])
      ];
    }

    // upload files if applicable
    if (files?.length > 0) {
      const fileMetas = await this.blobService.uploadFiles(
        files,
        `${
          process.env.BLOB_UPLOAD_IMAGE_FOLDER
        }/${user.currentWorkspace.toHexString()}`
      );
      updatedModel.files = [
        ...(fileMetas?.length > 0
          ? fileMetas?.map(f => (f._id as ObjectId).toString())
          : []),
        ...updatedModel.files
      ];
    }

    const order = payment.order as Order;

    // Calculate the total amount paid
    const transactionAmount = payment.transactions.reduce(
      (prev, cur) =>
        prev +
        ((cur._id as ObjectId).toString() !== transactionId
          ? cur?.status !== PaymentTransactionStatus.FAILED
            ? cur.amount
            : 0
          : 0),
      0
    );
    //  order charge totalAmount - Amount paid < Amount of this payment
    if (order?.charge.totalAmount - transactionAmount < updatedModel.amount) {
      throw new BadRequestException({
        code: 'err_payment_amount_limit',
        payload: {
          amount: updatedModel.amount,
          balance: order?.charge?.totalAmount - transactionAmount
        }
      });
    }

    // payment status
    let status = payment.status;

    // check paid amount === order.charge.totalAmount
    let isPaid = false;
    isPaid =
      order?.charge?.totalAmount - transactionAmount - updatedModel.amount === 0
        ? true
        : false;
    // if will update transaction status  === SUCCESS
    if (updatedModel.status === PaymentTransactionStatus.SUCCESS) {
      // check paid and have pending record
      if (
        !isPaid ||
        payment.transactions
          .filter(t => (t._id as ObjectId).toString() !== transactionId)
          .map(t => t.status)
          .includes(PaymentTransactionStatus.PENDING)
      ) {
        status = PaymentStatus.PARTIAL;
      } else {
        // all record  not have pending.will update payment status paid
        if (
          !payment.transactions
            .filter(t => (t._id as ObjectId).toString() !== transactionId)
            .map(t => t.status)
            .includes(PaymentTransactionStatus.PENDING)
        ) {
          status = PaymentStatus.PAID;
        }
      }
    }

    const promiseList = [];
    promiseList.push(
      this.paymentRepository
        .findOneAndUpdate(
          {_id, 'transactions._id': transactionId},
          {status: status, 'transactions.$': updatedModel},
          {
            new: true
          }
        )
        .lean()
        .exec()
    );

    // get the workspace
    const workspace = await this.workspaceService.findById(
      order.workspace.toString()
    );
    if (status === PaymentStatus.PAID) {
      promiseList.push(
        this.orderService.updateOrderStatus(order, OrderStatus.PREPARE_SHIPMENT)
      );
    }

    // if update status == SUCCESS  or FAILED
    if (
      [
        PaymentTransactionStatus.SUCCESS,
        PaymentTransactionStatus.FAILED
      ].includes(updatedModel.status)
    ) {
      //  workspace?.preferences?.pushNotification?.paymenTransactionStatusUpdate  === true
      //  will push notification to order client
      if (
        workspace?.preferences?.pushNotification?.paymenTransactionStatusUpdate
      ) {
        // get order client user
        const toUser = await this.userService.findById(order.client.toString());
        const locale = this.getLocale();
        promiseList.push(
          this.sendPaymentPushNotification(
            toUser,
            locale.tAll('msg_payment_transaction_title'),
            locale.tAll(
              model.status === PaymentTransactionStatus.SUCCESS
                ? 'msg_payment_transaction_success'
                : 'msg_payment_transaction_fail',
              [`${order?.charge?.currency} ${model.amount.toString()}`]
            ),
            {
              screen: PushNotificationMerchantScreenType.TOPUP_DETAIL,
              parameters: {
                _id: order?._id
              }
            }
          )
        );
      }
    }
    const [paymentResult] = await Promise.all(promiseList);
    // if workspace integrations have  code is = add_credit
    if (
      paymentResult.status === PaymentStatus.PAID &&
      workspace?.integrations.length > 0
    ) {
      const hook = workspace?.integrations
        .find(i => i.app === IntegrationAppType.CUSTOMIZE)
        ?.hooks?.find(h => h.code === 'add_credit');
      if (hook) {
        const toUser = await this.userService.findById(
          order?.client.toString()
        );
        const locale = this.getLocale();
        let orderProducts = await this.orderProductService.find({
          order: (order._id as ObjectId).toString()
        });
        orderProducts = await this.orderProductService._populate(
          orderProducts,
          ['$items.product', '$items.productSKU']
        );
        let creditAmount = 0;
        orderProducts.forEach(op =>
          op.items.forEach(item => {
            creditAmount += item?.amount * item?.qty;
          })
        );
        await this.createUserCredit(
          workspace?._id.toHexString(),
          hook,
          order.client,
          creditAmount
        );
        await this.sendPaymentPushNotification(
          toUser,
          locale.tAll('msg_credit_add_success', [creditAmount.toString()]),
          {},
          {
            screen: PushNotificationMerchantScreenType.TOPUP_DETAIL,
            parameters: {
              _id: order?._id
            }
          }
        );
      }
    }
    return paymentResult;
  }

  /**
   *
   * @param model payment model for create
   */
  public async createPayment(
    model: PaymentCreateModel,
    files?: Express.Multer.File[]
  ) {
    const user = this.getCurrentUser<IUser>();

    // find order by order id
    const order = await this.orderService.findById(model?.order);

    // Calculate the total transaction amount
    let transactionAmount = 0;
    model?.transactions.forEach(
      v =>
        (transactionAmount +=
          v.status !== PaymentTransactionStatus.FAILED ? v.amount : 0)
    );

    // if transaction amount >= order charge totalAmount
    if (transactionAmount > order?.charge?.totalAmount) {
      throw new BadRequestException({
        code: 'err_payment_amount_limit',
        payload: {
          amount: model.transactions[0].amount,
          balance:
            order?.charge?.totalAmount -
            (transactionAmount - model.transactions[0].amount)
        }
      });
    }

    // upload files if applicable
    if (files?.length > 0) {
      const fileMetas = await this.blobService.uploadFiles(
        files,
        `${
          process.env.BLOB_UPLOAD_IMAGE_FOLDER
        }/${user.currentWorkspace.toHexString()}`
      );
      // create payment always associate files with first transaction
      model.transactions[0].files = [
        ...(model?.transactions?.[0]?.files || []),
        ...(fileMetas?.length > 0
          ? fileMetas.map(f => (f._id as ObjectId).toString())
          : [])
      ];
    }

    const pendingAmount = model.transactions.reduce(
      (prev, cur) =>
        prev +
        (cur.status === PaymentTransactionStatus.PENDING ? cur.amount : 0),
      0
    );

    // generate receipt no.
    const receiptNo = await this.autoNumberService.generate({
      type: 'receipt',
      date: new Date(),
      workspace: user.currentWorkspace.toHexString()
    });
    model.transactions[0].receiptNo = receiptNo;

    /**
     * PaymentStatus = PAID , when all paid and sum(amount) = order.amount, otherwise it is Partial paid or not paid
     * PaymentStatus = Partial paid sum(amount) PAID < order.amount BUT > 0
     * PaymentStatus = NOT PAID, when sum(amount) = 0
     */
    if (
      !model.transactions
        .map(t => t.status)
        .includes(PaymentTransactionStatus.SUCCESS)
    ) {
      model.status = PaymentStatus.NOT_PAID;
    } else {
      model.status =
        transactionAmount < order?.charge?.totalAmount || pendingAmount > 0
          ? PaymentStatus.PARTIAL
          : PaymentStatus.PAID;
    }

    const promiseList = [];

    promiseList.push(
      this.paymentRepository
        .findOneAndUpdate({order: (model as any).order}, model as any, {
          new: true,
          lean: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true
        })
        .session(this.getMongoSession())
        .exec()
    );

    // get the workspace
    const workspace = await this.workspaceService.findById(
      order.workspace.toString()
    );

    // if payment satus = paid, will update order status
    if (model.status === PaymentStatus.PAID) {
      promiseList.push(
        this.orderService.updateOrderStatus(order, OrderStatus.PREPARE_SHIPMENT)
      );
    }
    // if update status == SUCCESS  or FAILED
    if (
      [
        PaymentTransactionStatus.SUCCESS,
        PaymentTransactionStatus.FAILED
      ].includes(model?.transactions?.[0]?.status)
    ) {
      //  workspace?.preferences?.pushNotification?.paymenTransactionStatusUpdate  === true
      //  will push notification to order client
      if (
        workspace?.preferences?.pushNotification?.paymenTransactionStatusUpdate
      ) {
        // get order client user
        const toUser = await this.userService.findById(order.client.toString());
        const locale = this.getLocale();
        promiseList.push(
          this.sendPaymentPushNotification(
            toUser,
            locale.tAll('msg_payment_transaction_title'),
            locale.tAll(
              model?.transactions?.[0].status ===
                PaymentTransactionStatus.SUCCESS
                ? 'msg_payment_transaction_success'
                : 'msg_payment_transaction_fail',
              [
                `${
                  order?.charge?.currency
                } ${model?.transactions?.[0].amount.toString()}`
              ]
            ),
            {
              screen: PushNotificationMerchantScreenType.TOPUP_DETAIL,
              parameters: {
                _id: order?._id
              }
            }
          )
        );
      }
    }

    const [payment] = await Promise.all(promiseList);

    // if workspace integrations have  code is = add_credit
    if (
      payment.status === PaymentStatus.PAID &&
      workspace?.integrations.length > 0
    ) {
      const hook = workspace?.integrations
        .find(i => i.app === IntegrationAppType.CUSTOMIZE)
        ?.hooks?.find(h => h.code === 'add_credit');
      if (hook) {
        const toUser = await this.userService.findById(order.client.toString());
        const locale = this.getLocale();
        let orderProducts = await this.orderProductService.find({
          order: (order._id as ObjectId).toString()
        });
        orderProducts = await this.orderProductService._populate(
          orderProducts,
          ['$items.product', '$items.productSKU']
        );
        let creditAmount = 0;
        orderProducts.forEach(op =>
          op.items.forEach(item => {
            creditAmount += item?.amount * item?.qty;
          })
        );
        await this.createUserCredit(
          workspace?._id.toHexString(),
          hook,
          order.client,
          creditAmount
        );
        this.sendPaymentPushNotification(
          toUser,
          locale.tAll('msg_credit_add_success', [creditAmount.toString()]),
          {},
          {
            screen: PushNotificationMerchantScreenType.TOPUP_DETAIL,
            parameters: {
              _id: order?._id
            }
          }
        );
      }
    }
    return payment;
  }

  /**
   *  push approve notification
   * @param toUsers            to users
   * @param transactionModel   payment transaction
   */
  public async sendPaymentPushNotification(toUsers, title, body, data) {
    this.notificationService.push({
      toUsers: [{user: toUsers}],
      toDevices: [],
      title,
      body,
      data
    });
  }

  /**
   * create user credit
   * @param workspace_id        workspace id
   * @param hook                workspace integrations hook
   * @param order               order
   */
  public async createUserCredit(workspaceid, hook, client, creditAmount) {
    const workspaceSafeKey = await this.workspaceService.getWorkspaceSafeKey(
      workspaceid
    );
    try {
      await this.httpService
        .post(
          hook.url,
          {
            user: client,
            description: 'add user credit',
            transactionType: TransactionType.IN,
            amountType: AmountType.POINT,
            amount: creditAmount
          },
          {
            headers: {
              'safe-key': workspaceSafeKey?.safeKey,
              timestamp: workspaceSafeKey?.timestamp,
              workspace: workspaceid,
              Authorization: `bearer ${process.env.WEBHOOK_AUTH_TOKEN}`
            }
          }
        )
        .toPromise();
    } catch (error) {
      throw new BadRequestException({
        code: 'msg_credit_add_fail'
      });
    }
  }
}
