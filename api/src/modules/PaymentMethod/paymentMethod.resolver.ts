import {UseFilters} from '@nestjs/common';
import {Args, Query, Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter, GqlLocaleDecorator} from 'src/core';
import {PaymentMethodService} from './paymentMethod.service';

@Resolver('PaymentMethod')
@UseFilters(GraphQLExceptionFilter)
export class PaymentMethodResolver {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @ResolveField('name')
  async getName(@Parent() paymentMethod, @GqlLocaleDecorator() locale) {
    return paymentMethod.name[locale.getLanguage()];
  }

  @Query()
  async paymentMethod(@Args('id') id: string) {
    return this.paymentMethodService.findById(id, {lean: true});
  }

  @Query()
  async paymentMethods(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.paymentMethodService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }
}
