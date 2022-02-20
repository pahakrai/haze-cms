import {UseFilters} from '@nestjs/common';
import {Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';

import {OrderTimeService} from './orderTime.service';

@Resolver('OrderTime')
@UseFilters(GraphQLExceptionFilter)
export class OrderTimeResolver {
  constructor(private readonly orderTimeService: OrderTimeService) {}

  @ResolveField('order')
  async getOrder(@Parent() orderTime) {
    if (!orderTime.order) {
      return null;
    }

    const {order} = await this.orderTimeService._populate(orderTime, ['order']);

    return order;
  }
}
