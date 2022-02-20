import {UseFilters} from '@nestjs/common';
import {Args, Query, Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {WorkspacePaymentMethodService} from './workspacePaymentMethod.service';

@Resolver('WorkspacePaymentMethod')
@UseFilters(GraphQLExceptionFilter)
export class WorkspacePaymentMethodResolver {
  constructor(
    private readonly workspacePaymentMethodService: WorkspacePaymentMethodService
  ) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() workspacePaymentMethod) {
    if (!workspacePaymentMethod.workspace) {
      return null;
    }

    const {
      workspace
    } = await this.workspacePaymentMethodService._populate(
      workspacePaymentMethod,
      ['workspace']
    );

    return workspace;
  }

  @ResolveField('paymentMethod')
  async getPaymentMethod(@Parent() workspacePaymentMethod) {
    if (!workspacePaymentMethod.paymentMethod) {
      return null;
    }

    const {
      paymentMethod
    } = await this.workspacePaymentMethodService._populate(
      workspacePaymentMethod,
      ['paymentMethod']
    );

    return paymentMethod;
  }

  @Query()
  async workspacePaymentMethod(@Args('id') id: string) {
    return this.workspacePaymentMethodService.findById(id, {lean: true});
  }

  @Query()
  @RequireLogin()
  async workspacePaymentMethods(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.workspacePaymentMethodService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Query()
  async paymentServiceCharge(
    @Args('amount') amount: number,
    @Args('paymentMethod') paymentMethod: string
  ) {
    return this.workspacePaymentMethodService.getPaymentServiceCharge(
      amount,
      paymentMethod
    );
  }
}
