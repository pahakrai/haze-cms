import {UseFilters} from '@nestjs/common';
import {Args, Query, Mutation, Resolver} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {CurrencyService} from './currency.service';

@Resolver('Currency')
@UseFilters(GraphQLExceptionFilter)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Query()
  async currency(@Args('id') id: string) {
    return this.currencyService.findById(id, {lean: true});
  }

  @Query()
  async currencys(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.currencyService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createCurrency(@Args('currencyCreateModel') currencyCreateModel) {
    return this.currencyService.create(currencyCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateCurrency(
    @Args('id') id: string,
    @Args('currencyUpdateModel') currencyUpdateModel
  ) {
    return this.currencyService.update(id, currencyUpdateModel, {lean: true});
  }
}
