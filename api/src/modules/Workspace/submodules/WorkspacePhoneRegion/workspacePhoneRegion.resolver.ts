/* eslint-disable max-len */
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
import {IWorkspacePhoneRegion} from './interfaces';
import {WorkspacePhoneRegionService} from './workspacePhoneRegion.service';

@Resolver('WorkspacePhoneRegion')
@UseFilters(GraphQLExceptionFilter)
export class WorkspacePhoneRegionResolver {
  constructor(
    private readonly workspacePhoneRegionService: WorkspacePhoneRegionService
  ) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() workspacePhoneRegion: IWorkspacePhoneRegion) {
    if (!workspacePhoneRegion.workspace) {
      return null;
    }
    const {
      workspace
    } = await this.workspacePhoneRegionService._populate(workspacePhoneRegion, [
      'workspace'
    ]);
    return workspace;
  }

  @ResolveField('phoneRegion')
  async getPhoneRegion(@Parent() workspacePhoneRegion: IWorkspacePhoneRegion) {
    if (!workspacePhoneRegion.phoneRegion) {
      return null;
    }
    const {
      phoneRegion
    } = await this.workspacePhoneRegionService._populate(workspacePhoneRegion, [
      'phoneRegion'
    ]);
    return phoneRegion;
  }

  @Query()
  async workspacePhoneRegion(@Args('id') id: string) {
    return this.workspacePhoneRegionService.findById(id, {lean: true});
  }

  @Query()
  async workspacePhoneRegions(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.workspacePhoneRegionService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createWorkspacePhoneRegion(
    @Args('workspacePhoneRegionCreateModel') workspacePhoneRegionCreateModel
  ) {
    return this.workspacePhoneRegionService.create(
      workspacePhoneRegionCreateModel,
      {lean: true}
    );
  }

  @Mutation()
  @RequireLogin()
  async updateWorkspacePhoneRegion(
    @Args('id') id: string,
    @Args('workspacePhoneRegionUpdateModel') workspacePhoneRegionUpdateModel
  ) {
    return this.workspacePhoneRegionService.update(
      id,
      workspacePhoneRegionUpdateModel,
      {lean: true}
    );
  }
}
