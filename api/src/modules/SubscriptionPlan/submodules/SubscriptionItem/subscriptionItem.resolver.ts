import {UseFilters} from '@nestjs/common';
import {Args, Parent, Resolver, ResolveField, Query} from '@nestjs/graphql';
import {GraphQLExceptionFilter, GqlLocaleDecorator} from 'src/core';
import {SubscriptionItemService} from './subscriptionItem.service';

@Resolver('SubscriptionItem')
@UseFilters(GraphQLExceptionFilter)
export class SubscriptionItemResolver {
  constructor(
    private readonly subscriptionItemService: SubscriptionItemService
  ) {}

  @ResolveField('name')
  async getName(@Parent() subscriptionItem, @GqlLocaleDecorator() locale) {
    return subscriptionItem.name[locale.getLanguage()];
  }

  @ResolveField('description')
  async getDescription(
    @Parent() subscriptionItem,
    @GqlLocaleDecorator() locale
  ) {
    return subscriptionItem.description[locale.getLanguage()];
  }

  @Query()
  async subscriptionItem(@Args('id') id: string) {
    return this.subscriptionItemService.findById(id, {lean: true});
  }

  @Query()
  async subscriptionItems(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.subscriptionItemService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }
}
