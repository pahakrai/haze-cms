import {UseFilters} from '@nestjs/common';
import {Args, Query, Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';
import {OrderLogService} from './orderLog.service';

@Resolver('OrderLog')
@UseFilters(GraphQLExceptionFilter)
export class OrderLogResolver {
  constructor(private readonly orderLogService: OrderLogService) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() orderLog) {
    const {workspace} = await this.orderLogService._populate(orderLog, [
      'workspace'
    ]);
    return workspace;
  }

  @ResolveField('order')
  async getOrder(@Parent() orderLog) {
    const {order} = await this.orderLogService._populate(orderLog, ['order']);

    return order;
  }

  @ResolveField('user')
  async getUser(@Parent() orderLog) {
    const {user} = await this.orderLogService._populate(orderLog, ['user']);

    return user;
  }

  @Query()
  async orderLog(@Args('id') id: string) {
    return this.orderLogService.findById(id);
  }

  @Query()
  async orderLogs(@Args('query') query, @Args('paginate') paginate) {
    return this.orderLogService.findWithCursorPaginate(query, paginate);
  }
}
