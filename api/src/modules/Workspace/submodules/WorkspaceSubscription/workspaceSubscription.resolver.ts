import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {WorkspaceSubscriptionService} from './workspaceSubscription.service';

@Resolver('WorkspaceSubscription')
@UseFilters(GraphQLExceptionFilter)
export class WorkspaceSubscriptionResolver {
  constructor(
    private readonly workspaceSubscriptionService: WorkspaceSubscriptionService
  ) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() workspaceSubscription) {
    if (!workspaceSubscription.workspace) {
      return null;
    }

    const {
      workspace
    } = await this.workspaceSubscriptionService._populate(
      workspaceSubscription,
      ['workspace']
    );

    return workspace;
  }

  @ResolveField('subscriptionPlan')
  async getSubscriptionPlan(@Parent() workspaceSubscription) {
    if (!workspaceSubscription.subscriptionPlan) {
      return null;
    }

    const {
      subscriptionPlan
    } = await this.workspaceSubscriptionService._populate(
      workspaceSubscription,
      ['subscriptionPlan']
    );

    return subscriptionPlan;
  }

  @Query()
  async workspaceSubscription(@Args('id') id: string) {
    return this.workspaceSubscriptionService.findById(id, {lean: true});
  }

  @Query()
  async workspaceSubscriptions(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.workspaceSubscriptionService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createWorkspaceSubscription(
    @Args('workspaceSubscriptionCreateModel') workspaceSubscriptionCreateModel
  ) {
    return this.workspaceSubscriptionService.create(
      workspaceSubscriptionCreateModel,
      {lean: true}
    );
  }

  @Mutation()
  @RequireLogin()
  async updateWorkspaceSubscription(
    @Args('id') id: string,
    @Args('workspaceSubscriptionUpdateModel') workspaceSubscriptionUpdateModel
  ) {
    return this.workspaceSubscriptionService.update(
      id,
      workspaceSubscriptionUpdateModel,
      {lean: true}
    );
  }
}
