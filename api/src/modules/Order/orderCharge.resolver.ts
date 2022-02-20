import {UseFilters} from '@nestjs/common';
import {Parent, Resolver, ResolveField} from '@nestjs/graphql';

import {GraphQLExceptionFilter} from 'src/core';

import {OrderService} from './order.service';

@Resolver('OrderCharge')
@UseFilters(GraphQLExceptionFilter)
export class OrderChargeResolver {
  constructor(private readonly orderService: OrderService) {}

  @ResolveField('services')
  async getServices(@Parent() orderCharge) {
    if (orderCharge.toJSON) {
      orderCharge = orderCharge.toJSON();
    }
    if (orderCharge.services.length === 0) {
      return [];
    }

    const {charge} = await this.orderService._populate({charge: orderCharge}, [
      '$charge.$services.service'
    ]);

    return charge?.services;
  }
}
