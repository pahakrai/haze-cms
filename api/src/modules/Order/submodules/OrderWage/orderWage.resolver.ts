import {UseFilters} from '@nestjs/common';
import {Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';

import {OrderWageService} from './orderWage.service';

@Resolver('OrderWage')
@UseFilters(GraphQLExceptionFilter)
export class OrderWageResolver {
  constructor(private readonly orderWageService: OrderWageService) {}

  @ResolveField('order')
  async getOrder(@Parent() orderWage) {
    if (!orderWage.order) {
      return null;
    }

    const {order} = await this.orderWageService._populate(orderWage, ['order']);

    return order;
  }
}
