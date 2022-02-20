import {UseFilters} from '@nestjs/common';
import {
  Resolver,
  ResolveField,
  Parent
  // Args,
  // Query,
  // Mutation
} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';

import {PricingServiceService} from './pricingService.service';

@Resolver('PricingService')
@UseFilters(GraphQLExceptionFilter)
export class PricingServiceResolver {
  constructor(private readonly pricingServiceService: PricingServiceService) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() PricingService) {
    if (!PricingService.workspace) return null;

    const {workspace} = await this.pricingServiceService._populate(
      PricingService,
      ['workspace']
    );

    return workspace;
  }

  @ResolveField('pricing')
  public async getPricing(@Parent() PricingService) {
    const {pricing} = await this.pricingServiceService._populate(
      PricingService,
      ['pricing']
    );

    return pricing;
  }

  @ResolveField('service')
  public async getService(@Parent() PricingService) {
    const {service} = await this.pricingServiceService._populate(
      PricingService,
      ['service']
    );

    return service;
  }
}
