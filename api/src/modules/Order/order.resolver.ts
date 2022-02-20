import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField,
  Subscription
} from '@nestjs/graphql';
import common from '@golpasal/common';

import {
  GraphQLExceptionFilter,
  GqlCurrentUser,
  RequireLogin,
  UserStatuses,
  processUpload
} from 'src/core';
import {OrderService} from './order.service';

import {OrderFormCreateModel} from './models';
import {PricingService} from '../Pricing/pricing.service';

const {UserStatus} = common.status;

@Resolver('Order')
@UseFilters(GraphQLExceptionFilter)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly pricingService: PricingService
  ) {}

  @ResolveField('signature')
  async getSignature(@Parent() order) {
    if (!order.signature) {
      return null;
    }
    const {signature} = await this.orderService._populate(order, ['signature']);
    return signature;
  }

  @ResolveField('quotation')
  async getQuotation(@Parent() order) {
    if (!order.quotation) {
      return null;
    }
    const {quotation} = await this.orderService._populate(order, ['quotation']);
    return quotation;
  }

  @ResolveField('client')
  async getClient(@Parent() order) {
    if (!order.client) {
      return null;
    }
    const {client} = await this.orderService._populate(order, ['client']);
    return client;
  }

  @ResolveField('billingContact')
  async getBillingContact(@Parent() order) {
    const {billingContact} = await this.orderService._populate(order, [
      'billingContact'
    ]);
    return billingContact;
  }

  @ResolveField('contactAddress')
  async getShippingContact(@Parent() order) {
    const {contactAddress} = await this.orderService._populate(order, [
      'contactAddress'
    ]);
    return contactAddress;
  }

  @ResolveField('services')
  async getServices(@Parent() order) {
    if (!order.services) {
      return null;
    }

    const {services} = await this.orderService._populate(order, [
      '$services.service'
    ]);

    return services;
  }

  @ResolveField('product')
  async getProduct(@Parent() order) {
    const {product} = await this.orderService._populate(order, ['product']);

    return product;
  }

  @ResolveField('time')
  async getTime(@Parent() order) {
    if (order.time) return order.time;

    const {time} = await this.orderService._populate(order, ['time']);

    return time;
  }

  @ResolveField('wage')
  async getWage(@Parent() order) {
    if (order.wage) return order.wage;

    const {wage} = await this.orderService._populate(order, ['wage']);

    return wage;
  }

  @ResolveField('payment')
  async getPayment(@Parent() order) {
    const {payment} = await this.orderService._populate(order, ['payment']);

    return payment;
  }

  @Query('myOrders')
  @RequireLogin()
  async myOrders(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options,
    @GqlCurrentUser() currentUser
  ) {
    return this.orderService.findWithCursorPaginate(
      {...query, client: currentUser._id},
      {
        ...paginate,
        ...options
      }
    );
  }

  @Query('myOrder')
  @RequireLogin()
  async myOrder(@Args('orderId') orderId, @GqlCurrentUser() currentUser) {
    return this.orderService.findOne({
      _ids: [orderId],
      client: currentUser?._id // client is most here
    });
  }

  @Query()
  @RequireLogin()
  async order(@Args('id') id: string) {
    return this.orderService.findById(id);
  }

  @Query()
  async orders(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.orderService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Query()
  async orderCharge(@Args('order') order) {
    return this.pricingService.getOrderCharge(order);
  }

  @Mutation()
  @UserStatuses(UserStatus.ACTIVE)
  async createOrder(@Args('model') model: OrderFormCreateModel) {
    return this.orderService.createOrder(model);
  }

  @Mutation()
  @UserStatuses(UserStatus.ACTIVE)
  async updateOrder(
    @Args('id') id: string,
    @Args('orderUpdateModel') orderUpdateModel
  ) {
    return this.orderService.update(id, orderUpdateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateOrderStatus(
    @Args('id') id: string,
    @Args('status') status: number
  ) {
    return this.orderService.updateOrderStatus(id, status);
  }

  @Mutation()
  @RequireLogin()
  async uploadSignature(@Args('id') id: string, @Args('files') files) {
    let uploadSignature;
    if (files && files.length > 0) {
      uploadSignature = await Promise.all(
        files?.map(file => processUpload(file))
      );
    }
    return this.orderService.uploadSignature(
      id,
      uploadSignature?.length > 0 && uploadSignature?.[0]
        ? uploadSignature[0]
        : undefined
    );
  }
}
