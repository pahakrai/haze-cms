import {UseFilters} from '@nestjs/common';
import {Resolver, ResolveField, Parent, Args, Query} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';

import {UserCreditService} from './userCredit.service';
import {UserService} from '../User';

@Resolver('UserCredit')
@UseFilters(GraphQLExceptionFilter)
export class UserCreditResolver {
  constructor(
    private readonly userCreditService: UserCreditService,
    private readonly userService: UserService
  ) {}

  @ResolveField('user')
  async getUser(@Parent() parent) {
    return this.userService.findById(parent.user);
  }

  @Query()
  public async userCreditBalance(
    @Args('userId') userId: string,
    @Args('amountType') amountType: string,
    @Args('currency') currency?: string
  ) {
    return this.userCreditService.getBalance(userId, amountType, currency);
  }

  @Query()
  public async userCreditHistory(
    @Args('userId') userId: string,
    @Args('amountType') amountType: string,
    @Args('paginate') paginate,
    @Args('currency') currency: string = null
  ) {
    return this.userCreditService.findWithCursorPaginate(
      {userId, amountType, currency},
      {...paginate, sort: {transactionDate: 1}}
    );
  }
}
