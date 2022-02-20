import {UseFilters} from '@nestjs/common';
import {Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';

import {PricingAdjustmentService} from './pricingAdjustment.service';

@Resolver('PricingAdjustment')
@UseFilters(GraphQLExceptionFilter)
export class PricingAdjustmentResolver {
  constructor(
    private readonly pricingAdjustmentService: PricingAdjustmentService
  ) {}

  @ResolveField('pricing')
  async getPricing(@Parent() pricingAdjustment) {
    const {pricing} = await this.pricingAdjustmentService._populate(
      pricingAdjustment,
      ['pricing']
    );

    return pricing;
  }

  @ResolveField('ref')
  async getRef(@Parent() pricingAdjustment) {
    if (!pricingAdjustment.ref) {
      return null;
    }

    const {ref} = await this.pricingAdjustmentService._populate(
      pricingAdjustment,
      ['ref']
    );

    return ref;
  }
}
