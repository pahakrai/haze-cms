import {UseFilters} from '@nestjs/common';
import {Args, Query, Resolver, ResolveField, Parent} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';

import {PricingService} from './pricing.service';

@Resolver('Pricing')
@UseFilters(GraphQLExceptionFilter)
export class PricingResolver {
  constructor(private readonly pricingService: PricingService) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() pricing) {
    if (!pricing.workspace) return null;

    const {workspace} = await this.pricingService._populate(pricing, [
      'workspace'
    ]);

    return workspace;
  }

  @Query()
  async pricing(@Args('id') id: string) {
    return this.pricingService.findById(id);
  }

  @Query()
  pricings(@Args('query') query, @Args('paginate') paginate) {
    return this.pricingService.findWithCursorPaginate(query, paginate);
  }
}
