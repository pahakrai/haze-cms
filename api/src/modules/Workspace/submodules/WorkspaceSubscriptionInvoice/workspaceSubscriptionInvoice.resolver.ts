import {UseFilters} from '@nestjs/common';
import {Args, Query, Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';

import {WorkspaceSubscriptionInvoiceService} from './workspaceSubscriptionInvoice.service';

@RequireLogin()
@Resolver('WorkspaceSubscriptionInvoice')
@UseFilters(GraphQLExceptionFilter)
export class WorkspaceSubscriptionInvoiceResolver {
  constructor(
    private readonly workspaceSubscriptionInvoiceService: WorkspaceSubscriptionInvoiceService
  ) {}

  @ResolveField('subscription')
  async getSubscription(@Parent() workspaceSubscriptionInvoice) {
    if (!workspaceSubscriptionInvoice.subscription) {
      return null;
    }

    const {
      subscription
    } = await this.workspaceSubscriptionInvoiceService._populate(
      workspaceSubscriptionInvoice,
      ['subscription']
    );

    return subscription;
  }

  @Query()
  async workspaceSubscriptionInvoice(@Args('id') id: string) {
    return this.workspaceSubscriptionInvoiceService.findById(id, {lean: true});
  }

  @Query()
  async workspaceSubscriptionInvoices(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.workspaceSubscriptionInvoiceService.findWithCursorPaginate(
      query,
      {
        ...paginate,
        ...options
      }
    );
  }

  // @Mutation()
  // async createWorkspaceSubscriptionInvoice(
  //   @Args('workspaceSubscriptionInvoiceCreateModel')
  //   workspaceSubscriptionInvoiceCreateModel
  // ) {
  //   return this.workspaceSubscriptionInvoiceService.create(
  //     workspaceSubscriptionInvoiceCreateModel,
  //     {lean: true}
  //   );
  // }

  // @Mutation()
  // async updateWorkspaceSubscriptionInvoice(
  //   @Args('id') id: string,
  //   @Args('workspaceSubscriptionInvoiceUpdateModel')
  //   workspaceSubscriptionInvoiceUpdateModel
  // ) {
  //   return this.workspaceSubscriptionInvoiceService.update(
  //     id,
  //     workspaceSubscriptionInvoiceUpdateModel,
  //     {lean: true}
  //   );
  // }
}
