import {UseFilters} from '@nestjs/common';
import {Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';

import {OrderProductService} from './orderProduct.service';

@Resolver('OrderProduct')
@UseFilters(GraphQLExceptionFilter)
export class OrderProductResolver {
  constructor(private readonly orderProductService: OrderProductService) {}

  @ResolveField('order')
  async getOrder(@Parent() orderProduct) {
    if (!orderProduct.order) {
      return null;
    }

    const {order} = await this.orderProductService._populate(orderProduct, [
      'order'
    ]);

    return order;
  }

  @ResolveField('items')
  async getItems(@Parent() orderProduct) {
    if (!orderProduct.items) {
      return null;
    }

    const {items} = await this.orderProductService._populate(orderProduct, [
      '$items.product',
      '$items.productSKU'
    ]);

    return items;
  }
}
