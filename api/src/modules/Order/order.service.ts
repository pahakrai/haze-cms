import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import moment from 'moment';
import {ObjectId} from 'mongodb';
import {PaginateResult} from 'mongoose';
import common from '@golpasal/common';

import {
  pubSub,
  extractPaginateOptions,
  BadRequestException,
  NotFoundException,
  MongooseOption
} from 'src/core';
import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {IUser} from '../User';
import {
  OrderCreateModel,
  OrderUpdateModel,
  OrderSearchModel,
  OrderFormCreateModel,
  OrderFormUpdateModel
} from './models';
import {OrderModel, Order} from './interfaces';
import {AnalyticsDataModel} from 'src/core/models';

import {AddressService} from '../Address/address.service';
import {BlobService} from '../File/Blob';
import {ProductSkuService} from '../Product/submodules/ProductSku/productSku.service';
import {OrderProductService} from './submodules/OrderProduct/orderProduct.service';
import {OrderWageService} from './submodules/OrderWage/orderWage.service';
import {OrderTimeService} from './submodules/OrderTime/orderTime.service';
import {OrderLogService} from './submodules/OrderLog/orderLog.service';
import {UserService} from '../User/user.service';

import {PricingService} from '../Pricing/pricing.service';
import {AutoNumberService} from '../AutoNumber/autoNumber.service';
import {WorkspaceService} from '../Workspace/workspace.service';

import {OrderTime} from './submodules/OrderTime/interfaces';

const {OrderStatus, TravelOrderStatus} = common.status;
const {AddressType, OrderType, OrderLogType, UserType, WorkspaceType} =
  common.type;

const USER_PROJECT = '_userProject';

@Injectable({scope: Scope.REQUEST})
export class OrderService extends BaseCRUDService<
  Order,
  OrderCreateModel,
  OrderUpdateModel,
  OrderSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Orders') private readonly orderRepository: OrderModel,
    // private readonly orderResolver:
    private readonly addressService: AddressService,
    private readonly blobService: BlobService,
    private readonly pricingService: PricingService,
    private readonly workspaceService: WorkspaceService,
    private readonly autoNumberService: AutoNumberService,
    private readonly productSKUService: ProductSkuService,
    private readonly orderTimeService: OrderTimeService,
    private readonly orderWageService: OrderWageService,
    private readonly orderProductService: OrderProductService,
    private readonly orderLogService: OrderLogService,

    private readonly userSerivce: UserService
  ) {
    super(orderRepository, request);
  }

  public _castQuery(searchModel: OrderSearchModel) {
    const query: any = {$and: []};
    const user = this.getCurrentUser<IUser>();
    const {
      q,
      _ids,
      client,
      dateFr,
      dateTo,
      orderNo,
      statuses,
      workspace,
      createdAtFr,
      createdAtTo,
      pickupStores,
      services,
      orderType
    } = searchModel;

    const utcOffset = this.getUTCOffset();

    // handle workspace
    const workspaceId =
      user?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      workspace;

    // always pass workspace as query
    query.$and.push({
      workspace: new ObjectId(workspaceId) ? new ObjectId(workspaceId) : null
    });

    if (orderNo) {
      const qReg = new RegExp(orderNo, 'i');
      query.$and.push({
        orderNo: qReg
      });
    }

    if (q) {
      const qReg = new RegExp(q, 'i');
      query.$and.push({
        $or: [
          {
            orderNo: qReg
          },
          {
            remarks: qReg
          }
        ]
      });
    }

    if (client) {
      query.$and.push({client});
    }

    if (orderType) {
      query.$and.push({orderType});
    }

    // _ids
    if (_ids?.length > 0) {
      query.$and.push({
        _id: {
          $in: _ids.map(_id => new ObjectId(_id))
        }
      });
    }

    if (Array.isArray(statuses) && statuses.length > 0) {
      query.$and.push({status: {$in: statuses}});
    }

    // pickupStores
    if (pickupStores?.length > 0) {
      query.$and.push({
        pickupStore: {
          $in: pickupStores.map(pickupStore => new ObjectId(pickupStore))
        }
      });
    }

    // services
    if (services?.length > 0) {
      query.$and.push({
        'services.service': {
          $in: services.map(service => new ObjectId(service))
        }
      });
    }

    if (dateFr && dateTo) {
      query.$and.push({
        date: {
          $gte: dateFr,
          $lte: dateTo
        }
      });
    }

    if (createdAtFr) {
      // find orders createdAt after createdAtFr
      query.$and.push({
        createdAt: {
          $gte: moment(createdAtFr).utcOffset(utcOffset).startOf('day').toDate()
        }
      });
    }

    if (createdAtTo) {
      // find orders createdAt before createdAtTo
      query.$and.push({
        createdAt: {
          $lte: moment(createdAtTo).utcOffset(utcOffset).endOf('day').toDate()
        }
      });
    }

    return query;
  }

  public _lookupQuery(searchModel: OrderSearchModel) {
    const queryAnd = this._castQuery(searchModel);
    if (!queryAnd.$and.length) {
      queryAnd.$and = [];
    }
    const {clientUserTypes} = searchModel;

    if (clientUserTypes?.length > 0) {
      queryAnd.$and.push({
        [`${USER_PROJECT}.userTypes`]: {$in: clientUserTypes}
      });
    }

    return queryAnd.$and.length ? queryAnd : {};
  }

  /**
   * update order
   * verify billing/contact address changes
   * re-calculate charge and throw exception when amount change after payment
   *
   * @param orderId order id
   * @param updateModel changes of order
   * @param options mongoose option
   */
  public async update(
    orderId: string | ObjectId,
    updateModel: OrderFormUpdateModel,
    options?: any
  ) {
    const order = await this.findById(orderId as string, {lean: true});
    if (!order) {
      throw new BadRequestException({code: 'err_order_not_found'});
    }

    /* Start Address Logic */
    const {billingContact, billingContactId, contactAddress, contactAddressId} =
      updateModel;
    if (
      billingContactId &&
      billingContactId !== (order?.billingContact as ObjectId)?.toHexString()
    ) {
      // COPY AND UPDATE THE PREVIOUS BILLING CONTACT ADDRESS
      const billingAddress = await this.addressService.findById(
        billingContactId,
        {
          lean: true
        }
      );
      // deletes the copied address _id
      delete billingAddress._id;
      await this.addressService.update(
        (order?.billingContact as ObjectId).toHexString(),
        {
          ...billingAddress,
          refType: 'Orders',
          ref: order?._id?.toHexString(),
          type: AddressType.BILLING
        } as any
      );
    } else if (billingContact) {
      // update the corresponding ref contact address
      await this.addressService.update(
        (order?.billingContact as ObjectId).toHexString(),
        {
          ...billingContact,
          refType: 'Orders',
          ref: order?._id?.toHexString(),
          type: AddressType.BILLING
        }
      );
    }
    if (
      contactAddressId &&
      contactAddressId !== (order?.contactAddress as ObjectId)?.toHexString()
    ) {
      // COPY AND UPDATE THE PREVIOUS BILLING CONTACT ADDRESS
      const shippingAddress = await this.addressService.findById(
        contactAddressId,
        {
          lean: true
        }
      );
      // deletes the copied address _id
      delete shippingAddress._id;
      await this.addressService.update(
        (order?.contactAddress as ObjectId).toHexString(),
        {
          ...shippingAddress,
          refType: 'Orders',
          ref: order?._id?.toHexString(),
          type: AddressType.CONTACT
        } as any
      );
    } else if (contactAddress) {
      // update the corresponding ref contact address
      const contactAddressId = (
        order?.contactAddress as ObjectId
      ).toHexString();
      await this.addressService.update(contactAddressId, {
        ...contactAddress,
        refType: 'Orders',
        ref: order?._id?.toHexString(),
        type: AddressType.CONTACT
      });
    }
    /* End Address Logic */

    // time
    if (updateModel.time) {
      const orderTime = await this.orderTimeService.findOne({
        order: order._id.toHexString()
      });
      orderTime &&
        (await this.orderTimeService.update(orderTime._id, updateModel.time));
    }

    // re-calculate charge
    const newCharge = await this.pricingService.getOrderCharge({
      ...updateModel
    });

    if (
      newCharge.totalAmount !== order.charge.totalAmount &&
      order.status > OrderStatus.PENDING_PAYMENT
    ) {
      // if paid, do not allow update amount
      throw new BadRequestException({code: 'err_not_allow_change_amount'});
    }

    // order product (only when not paid)
    if (updateModel.product && order.status <= OrderStatus.PENDING_PAYMENT) {
      await this.orderProductService.findOneAndUpdate(
        {order: orderId as string},
        updateModel.product
      );
    }

    const updatedModel: any = {
      ...updateModel,
      charge: newCharge,
      // overrides the incoming updateModle back to its original data structure
      contactAddress: (order?.contactAddress as ObjectId)?.toHexString(),
      billingContact: (order?.billingContact as ObjectId)?.toHexString()
    };

    return super.update(orderId, updatedModel, options);
  }

  public async findById(_id: string, options?: MongooseOption): Promise<Order> {
    let order: Order;
    const user = await this.getCurrentUser<IUser>();

    switch (user?.userTypes[0]) {
      case UserType.MEMBER: {
        order = await this.findOne(
          {
            _ids: [_id],
            client: user?._id.toHexString()
          },
          options
        );
        break;
      }
      default:
        // can only get order with current workspace
        order = await this.findOne(
          {
            _ids: [_id]
          },
          options
        );
    }

    return order;
  }

  public async getOrderByQuotationId(quotationId: string) {
    const order = await this.orderRepository
      .findOne({
        quotation: quotationId
      })
      .exec();

    return order;
  }

  public async validateModel(formModel: OrderFormCreateModel) {
    let isValid = true;
    let err_code: string;
    const {contactAddressId, contactAddress, billingContact, billingContactId} =
      formModel;

    const currentUser = this.getCurrentUser<IUser>();
    const myWorkspace = await this.workspaceService.findById(
      currentUser.currentWorkspace
    );
    if (
      ([OrderType.EDUCATION, OrderType.SHOPPING] as string[]).includes(
        formModel.orderType
      )
    ) {
      if (!myWorkspace?.preferences?.order?.allowShoppingNoAddress) {
        // contact and billing contact are required for specific order type
        if (!contactAddressId && !contactAddress) {
          isValid = false;
          err_code = 'err_shipping_contact_not_provided';
        }

        if (!billingContact && !billingContactId) {
          isValid = false;
          err_code = 'err_billing_contact_not_provided';
        }

        if (!isValid) {
          // user error code and throw error here
          throw new BadRequestException({code: err_code});
        }
      }
    }
    return true;
  }

  async createOrder(formModel: OrderFormCreateModel): Promise<Order> {
    await this.validateModel(formModel);
    // get current workspace
    const currentUser = this.getCurrentUser<IUser>();
    const myWorkspace = await this.workspaceService.findById(
      currentUser.currentWorkspace
    );
    const orderType = formModel.orderType || myWorkspace.type;

    // Step 1. update inventory
    if (formModel.product) {
      // fetch all related skus
      const SKUs = await this.productSKUService.find({
        _ids: formModel.product.items.map(item => item.productSKU)
      });
      for (const item of formModel.product.items) {
        const productSKU = SKUs.find(
          s => s._id.toHexString() === item.productSKU
        );

        // If validateInventory = true, calculate the sku in the order of the same sku. qty
        if (productSKU.validateInventory) {
          const orders = await this.orderRepository
            .aggregate()
            .lookup({
              from: 'OrderProducts',
              localField: '_id',
              foreignField: 'order',
              as: '_ordersProducts'
            })
            .unwind('$_ordersProducts')
            .unwind('$_ordersProducts.items')
            .match({
              status: {$nin: [-1]},
              '_ordersProducts.items.productSKU': productSKU._id,
              workspace: currentUser?.currentWorkspace
            })
            .group({
              _id: '$_ordersProducts.items.productSKU',
              total: {$sum: '$_ordersProducts.items.qty'}
            });
          // same sku.qty
          let order_sku_qty_sum = 0;
          if (orders.length) {
            order_sku_qty_sum += orders.reduce((sum, o) => sum + o.total, 0);
          }

          // item qty is greater than the remaining sku.qty
          if (item.qty > productSKU.qty - order_sku_qty_sum) {
            throw new BadRequestException({
              code: 'err_productSku_inventory_shortage'
            });
          }
        }
      }
    }

    // Step 2. Find all charges to ensure no discrepancy
    //   between client price and server price
    // initialize charge
    const charge = await this.pricingService.getOrderCharge(formModel, true);

    // Step 3: Create order
    const orderNo = await this.autoNumberService.generate({
      type: 'order',
      date: new Date(),
      workspace: currentUser.currentWorkspace.toHexString(),
      subType: formModel.orderType
    });

    // if current user is not member, allow pass client id
    let client: string;
    if (
      currentUser.userTypes.includes(UserType.PROVIDER) ||
      currentUser.userTypes.includes(UserType.SYSTEM_ADMIN)
    ) {
      client = formModel.client;
    } else {
      client = currentUser._id.toHexString();
    }

    /* Start of Contact Logic */
    // NOTE: create order id beforehand to use it
    // in address table ref
    const orderId = new ObjectId();
    let contactAddressId: string;
    let billingContactId: string;
    if (
      !myWorkspace?.preferences?.order?.allowShoppingNoAddress &&
      formModel.orderType === OrderType.SHOPPING &&
      ((!formModel?.contactAddressId && !formModel?.contactAddress) ||
        (!formModel?.billingContactId && !formModel?.billingContact))
    ) {
      throw new BadRequestException({code: 'err_address_not_found'});
    }
    if (formModel?.contactAddressId) {
      const contactAddress = await this.cloneAddress(
        formModel?.contactAddressId,
        orderId?.toHexString(),
        AddressType.CONTACT
      );
      contactAddressId = contactAddress?._id?.toHexString();
    } else if (formModel?.contactAddress) {
      const contactAddress = await this.addressService.create({
        ...formModel.contactAddress,
        refType: 'Orders',
        ref: orderId?.toHexString(),
        type: AddressType.CONTACT
      });
      contactAddressId = contactAddress?._id?.toHexString();
    }

    if (formModel?.billingContactId) {
      const contactAddress = await this.cloneAddress(
        formModel?.billingContactId,
        orderId?.toHexString(),
        AddressType.BILLING
      );
      billingContactId = contactAddress?._id?.toHexString();
    } else if (formModel?.billingContact) {
      const billingContactAddress = await this.addressService.create({
        ...formModel.billingContact,
        refType: 'Orders',
        ref: orderId?.toHexString(),
        type: AddressType.BILLING
      });
      billingContactId = billingContactAddress?._id?.toHexString();
    }
    /* End of Contact Logic */

    // default status based on workspace type
    let status: number;

    switch (orderType) {
      case OrderType.LOGISTICS:
        status = TravelOrderStatus.AWAITING;
        break;
      default:
        status = OrderStatus.PENDING_PAYMENT;
        break;
    }

    let contact = {
      ...formModel?.contact
    };
    if (!formModel?.contact?.name || formModel?.contact?.phone) {
      const clientUser = await this.userSerivce.findById(client);
      const first = (clientUser && clientUser.firstName) || '';
      const last = (clientUser && clientUser.lastName) || '';
      if (!formModel?.contact?.name) {
        contact = {
          ...contact,
          name:
            first && last
              ? `${first} ${last}`
              : first || last || clientUser?.username
        };
      }
      if (!formModel?.contact?.phone) {
        contact = {
          ...contact,
          phone: clientUser?.phone
        };
      }
    }

    // calculate Credit Required
    const creditRequired = await this.calculateCreditRequired();

    console.log('create order', orderNo);
    const order = await super.create(
      {
        _id: orderId?.toHexString(),
        client,
        status,
        charge,
        orderNo,
        orderType,
        creditRequired: creditRequired,
        clientDevice: formModel.clientDevice,
        quotation: formModel.quotation,
        date: formModel.date || new Date(),
        remarks: formModel?.remarks,
        contactAddress: contactAddressId,
        billingContact: billingContactId,
        contact: contact,
        consignee: formModel.consignee,
        services: formModel.services,
        pickupStore: formModel.pickupStore,
        workspace: currentUser.currentWorkspace.toHexString()
      },
      {lean: true}
    );

    // create order subdocument if exists

    // Time
    let time: OrderTime;
    if (formModel.time) {
      // define fixed current time
      const currentTime = new Date();

      // if no scheduleTime defined
      if (!formModel.time.scheduleTime) {
        // we'll use current time as scheduleTime
        formModel.time.scheduleTime = currentTime;
      } else if (formModel.time.scheduleTime < currentTime) {
        // if scheduleTime is less than now, use currentTime
        formModel.time.scheduleTime = currentTime;
      }
      // calculate timeScheduledAhead based on
      // scheduleTime minus currentTime
      formModel.time.timeScheduledAhead =
        formModel.time.scheduleTime.getTime() - currentTime.getTime();

      // define pending request expire date as current
      // time + 1 mins 10 s
      const pendingRequestExpireAt = new Date(
        formModel.time.scheduleTime.valueOf() + 70000
      );
      formModel.time.pendingRequestExpireAt = pendingRequestExpireAt;
      formModel.time.pendingRequestExpireIn =
        pendingRequestExpireAt.getTime() -
        formModel.time.scheduleTime.getTime();

      time = await this.orderTimeService.create({
        ...formModel.time,
        order: order._id.toHexString()
      });
    }

    // Wage
    if (formModel.wage) {
      // create OrderWage document
      await this.orderWageService.create({
        ...formModel.wage,
        order: order._id.toHexString()
      });
    }

    // Product
    if (formModel.product) {
      // create OrderProduct document
      await this.orderProductService.create({
        order: order._id.toHexString(),
        items: formModel.product.items
      });
    }

    return order;
  }

  /**
   * group order by month and calculate monthly amount
   * @param searchModel order search model
   */
  public async findOrderMonthlyAmount(searchModel: OrderSearchModel) {
    const utcOffset = this.getUTCOffset();
    const query = this._castQuery(searchModel);

    return (
      this.orderRepository
        .aggregate()
        .match(query)
        .project({
          // extract month from order.date
          month: {$month: {$add: ['$date', utcOffset * 60 * 1000]}},
          // extract year from order.date
          year: {$year: {$add: ['$date', utcOffset * 60 * 1000]}},
          // order.charge.totalAmount
          amount: '$charge.totalAmount'
        })
        .addFields({
          // string with format YYYY-MM
          yearMonth: {
            $concat: [
              {$toString: '$year'},
              '-',
              // pad '0' if month is in single digit
              {
                $cond: [
                  {$lte: ['$month', 9]},
                  {$concat: ['0', {$toString: '$month'}]},
                  {$toString: '$month'}
                ]
              }
            ]
          }
        })
        // group by yearMonth and sum the order amount
        .group({
          _id: {yearMonth: '$yearMonth'},
          total: {$sum: '$amount'}
        })
        .project({
          yearMonth: '$_id.yearMonth',
          total: 1
        })
        .exec()
    );
  }

  /**
   * accept order
   * @param _id
   * @param currentUser
   * @param location
   */
  async cloneAddress(addressId: string, orderId: string, addressType: string) {
    const address = await this.addressService.findById(addressId, {lean: true});
    if (!address) {
      throw new BadRequestException({code: 'err_address_not_found'});
    }
    // NOTE: delete the previous address id before cloning the address
    delete address._id;
    return this.addressService.create({
      ...address,
      refType: 'Orders',
      ref: orderId,
      type: addressType
    } as any);
  }
  /**
   * upate status
   *
   * @param order order id or
   * @param status new status
   */
  async updateOrderStatus(order: string | Order, status: number) {
    let _order: Order;

    // use passed order object, or find by the provided id
    if (typeof order === 'string') {
      _order = await this.findById(order);

      if (!_order) {
        throw new BadRequestException({code: 'err_order_not_found'});
      }
    } else {
      _order = order;
    }

    // cannot change cancelled order
    if (
      _order.status === OrderStatus.CANCELLED ||
      _order.status === TravelOrderStatus.CANCELLED
    ) {
      throw new BadRequestException({code: 'err_invalid_order_status'});
    }

    const workspace = await this.workspaceService.findById(
      _order.workspace.toString()
    );
    const locale = this.getLocale();
    let oldStatus = '';
    let newStatus = '';
    let isUpdateCompleteTime = false;

    switch (_order.orderType) {
      case OrderType.EDUCATION:
        switch (status) {
          case OrderStatus.COMPLETED:
            if (_order.status !== OrderStatus.SHIPPED) {
              throw new BadRequestException({code: 'err_invalid_order_status'});
            }
            isUpdateCompleteTime = true;
            break;
        }
        oldStatus =
          common.locales[locale.getLanguage()].status.OrderStatus[
            OrderStatus[_order.status]
          ];
        newStatus =
          common.locales[locale.getLanguage()].status.OrderStatus[
            OrderStatus[status]
          ];
        break;
      case OrderType.SHOPPING:
        switch (status) {
          case OrderStatus.COMPLETED:
            // only shipped order can update to complete
            if (_order.status !== OrderStatus.SHIPPED) {
              throw new BadRequestException({code: 'err_invalid_order_status'});
            }
            isUpdateCompleteTime = true;
            break;
        }
        oldStatus =
          common.locales[locale.getLanguage()].status.OrderStatus[
            OrderStatus[_order.status]
          ];
        newStatus =
          common.locales[locale.getLanguage()].status.OrderStatus[
            OrderStatus[status]
          ];
        break;
      case OrderType.LOGISTICS:
        switch (status) {
          case TravelOrderStatus.ARRIVE_DESTINATION:
            if (_order.status < TravelOrderStatus.DRIVER_ACCEPTED) {
              throw new BadRequestException({code: 'err_invalid_order_status'});
            }
            isUpdateCompleteTime = true;
            break;
        }
        oldStatus =
          common.locales[locale.getLanguage()].status.TravelOrderStatus[
            TravelOrderStatus[_order.status]
          ];
        newStatus =
          common.locales[locale.getLanguage()].status.TravelOrderStatus[
            TravelOrderStatus[status]
          ];
        break;
      default:
        break;
    }

    // update order
    const updatedOrder = await super.update(_order._id, {
      completeTime: isUpdateCompleteTime ? new Date() : null,
      status: status
    });
    const currentUser = this.getCurrentUser();
    // add order log
    await this.orderLogService.create({
      reason: locale.t('msg_update_order_status', [oldStatus, newStatus]),
      order: _order?._id.toHexString(),
      user: currentUser._id.toHexString(),
      type: OrderLogType.UPDATE_STATUS
    });

    // publish subscription if enabled
    if (workspace.preferences?.order?.subscription) {
      pubSub.publish('orderUpdated', {
        order: updatedOrder
      });
    }

    return updatedOrder;
  }

  /**
   * cancel Order
   * @param orderId  orderId
   * @param reason
   * @param currentUser
   */
  async cancelOrder(
    orderId: string,
    reason = '',
    currentUser: IUser = this.getCurrentUser()
  ): Promise<Order> {
    let order = await this.findById(orderId, {lean: true});
    const utcOffset = this.getUTCOffset();
    let updateStatus = 0;
    if (!order) {
      throw new BadRequestException({code: 'err_order_not_found'});
    }
    const workspaceId =
      currentUser.currentWorkspace || this.getHeaderWorkspace();
    const workspace = await this.workspaceService.findById(workspaceId);
    switch (workspace.type) {
      case WorkspaceType.SHOPPING:
        // cannot cancel order  if status >= SHIPPED
        if (order.status >= OrderStatus.SHIPPED) {
          throw new BadRequestException({code: 'err_cancel_order_failed'});
        }
        updateStatus = OrderStatus.CANCELLED;
        break;
    }
    const locale = this.getLocale();
    // add cancel log
    await this.orderLogService.create({
      order: orderId,
      workspace: workspaceId.toHexString(),
      reason: reason !== '' ? reason : locale.t('order_cancelled'),
      user: currentUser._id.toHexString(),
      type: OrderLogType.CANCEL
    });

    // update order
    order = await super.update(
      orderId,
      {
        status: updateStatus
      },
      {lean: true}
    );

    if (workspace.preferences?.order?.subscription) {
      // publish to subscribed drivers
      pubSub.publish('orderUpdated', {
        order
      });
    }

    // return order
    return order;
  }

  async getOrdersByWorkspaces(
    query: OrderSearchModel,
    workspaces: Array<string>
  ): Promise<PaginateResult<Order>> {
    const paginateOptions = extractPaginateOptions(query);
    // NOTE: aggregate to match client workspaces
    const aggregationQuery = [
      {$match: query},
      {
        $lookup: {
          from: 'Users',
          localField: 'client',
          foreignField: '_id',
          as: 'user'
        }
      },
      {$unwind: '$user'},
      {$match: {'user.workspaces': {$in: [...workspaces]}}}
    ];
    return this.orderRepository.paginate({
      aggregationQuery,
      paginateOptions
    });
  }
  public async getOrderStats(type: string, query?: OrderSearchModel) {
    const data: AnalyticsDataModel = {route: {total: 0}, hour: {total: 0}};
    switch (type) {
      case 'ORDER_COUNT': {
        const prepQuery = await this._castQuery(query);
        data.route.total = await this.repository.countDocuments({
          ...prepQuery
        });
        data.hour.total = await this.repository
          .countDocuments({duration: {$gt: 0}, ...prepQuery})
          .exec();
        break;
      }
      case 'ORDER_COMPLETE_COUNT':
        data.total = await this.getOrderCount(query);
        break;
      case 'ORDER_AMOUNT':
        data.total = await this.getOrderAmount(query);
        break;
      default:
        throw new NotFoundException({
          code: 'data__not_exists'
        });
    }
    return data;
  }

  public async getOrderCount(query: OrderSearchModel = {}): Promise<number> {
    const prepQuery = await this._castQuery(query);
    const orderCount = await this.repository.countDocuments(prepQuery).exec();
    return orderCount;
  }

  public async getOrderAmount(query: OrderSearchModel = {}): Promise<number> {
    const prepQuery = this._castQuery(query);
    // aggregation required
    const order = await this.repository
      .aggregate([
        {$match: prepQuery},
        {$group: {_id: null, amount: {$sum: '$charge.totalAmount'}}}
      ])
      .exec();
    return order?.length ? order[0]?.amount : 0;
  }

  public async getInvoiceByOrderId(orderId: string) {
    const orderItem = await this.orderRepository
      .aggregate()
      .lookup({
        from: 'Users',
        localField: 'client',
        foreignField: '_id',
        as: 'users'
      })
      .lookup({
        from: 'Products',
        localField: '_eventCampaigns.product',
        foreignField: '_id',
        as: '_products'
      })
      .lookup({
        from: 'ProductSkus',
        localField: '_products._id',
        foreignField: 'product',
        as: '_productSkus'
      })
      .lookup({
        from: 'Workspaces',
        localField: 'workspace',
        foreignField: '_id',
        as: '_workspaces'
      })
      .unwind('$users')
      .match({
        _id: new ObjectId(orderId)
      });
    if (orderItem.length <= 0) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_order'}
      });
    }
    const orderProduct = await this.orderProductService.findOne({
      order: new ObjectId(orderId).toHexString()
    });

    const orderPoPu: any = await this.orderRepository
      .findById(orderId)
      .populate({path: 'charge.services.service'})
      .populate({
        path: 'payment',
        populate: {
          path: 'transactions.paymentMethod'
        }
      })
      .exec();
    const orderJson = orderPoPu?.toJSON() || {};
    const chargeServices = orderJson ? orderJson.charge.services : [];
    const payment = orderJson && orderJson.payment ? orderJson.payment : {};
    const paymentMethod = payment?.transactions?.[0]?._paymentMethod
      ? payment.transactions.map(v => v.paymentMethod)
      : [];
    const orderProducts = await this.orderProductService._populate(
      orderProduct,
      ['$items.product', '$items.productSKU.$specs.spec']
    );
    const orderProductLists = orderProducts?.items || [];
    const language = orderItem?.[0]?.users?.preferences?.language || 'en';
    const utcOffset = this.getUTCOffset();

    const orders = {
      ...(orderItem?.[0] ? orderItem[0] : {}),
      data: {
        screen: 'email/invoice.ejs'
      },
      utcOffset,
      _payments: payment,
      _paymentMethods: paymentMethod,
      orderProductLists: orderProductLists,
      chargeServices: chargeServices,
      language
    };
    const preData: any = {...orders};
    return preData;
  }

  public async calculateCreditRequired() {
    // get current workspace
    const currentUser = this.getCurrentUser<IUser>();
    const myWorkspace = await this.workspaceService.findById(
      currentUser.currentWorkspace
    );
    // If the workspace order consume Credit are both greater than 0
    if (myWorkspace?.preferences?.order?.consumeCredit) {
      // Credit needed to calculate the distance, now hardcode always = 2
      return 2;
    }
    // If not needed, return 0
    return 0;
  }

  /**
   * upload order signature file
   * @param _id             order _id
   * @param signature       file
   */
  public async uploadSignature(_id, signature) {
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;

    let signatureFileMeta = [];
    if (signature !== undefined) {
      signatureFileMeta = await this.blobService.uploadFiles(
        [signature],
        folder
      );
      if (signatureFileMeta && signatureFileMeta.length > 0) {
        return this.orderRepository
          .findByIdAndUpdate(
            _id,
            {
              signature: signatureFileMeta[0]._id
            },
            {
              new: true
            }
          )
          .exec();
      }
    }
    throw new BadRequestException({code: 'err_upload_order_signature'});
  }
}
