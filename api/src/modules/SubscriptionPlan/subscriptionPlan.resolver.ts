import {UseFilters} from '@nestjs/common';
import {Args, Query, Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter, GqlLocaleDecorator} from 'src/core';

import {SubscriptionPlanService} from './subscriptionPlan.service';

@Resolver('SubscriptionPlan')
@UseFilters(GraphQLExceptionFilter)
export class SubscriptionPlanResolver {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService
  ) {}

  @ResolveField('items')
  async getAbc(@Parent() subscriptionPlan) {
    if (!subscriptionPlan.items) {
      return null;
    }
    const {
      items
    } = await this.subscriptionPlanService._populate(subscriptionPlan, [
      '$items.item'
    ]);

    return items;
  }

  @ResolveField('name')
  async getName(@Parent() subscriptionPlan, @GqlLocaleDecorator() locale) {
    return subscriptionPlan.name[locale.getLanguage()];
  }

  @ResolveField('description')
  async getDescription(
    @Parent() subscriptionPlan,
    @GqlLocaleDecorator() locale
  ) {
    return subscriptionPlan.description[locale.getLanguage()];
  }

  @Query()
  async subscriptionPlan(@Args('id') id: string) {
    return this.subscriptionPlanService.findById(id, {lean: true});
  }

  @Query()
  async subscriptionPlans(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.subscriptionPlanService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  // @Mutation()
  // async createSubscriptionPlan(
  //   @Args('subscriptionPlanCreateModel') subscriptionPlanCreateModel
  // ) {
  //   return this.subscriptionPlanService.create(subscriptionPlanCreateModel, {
  //     lean: true
  //   });
  // }

  // @Mutation()
  // async updateSubscriptionPlan(
  //   @Args('id') id: string,
  //   @Args('subscriptionPlanUpdateModel') subscriptionPlanUpdateModel
  // ) {
  //   return this.subscriptionPlanService.update(
  //     id,
  //     subscriptionPlanUpdateModel,
  //     {lean: true}
  //   );
  // }
}
