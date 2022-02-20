import {UseFilters, UseInterceptors} from '@nestjs/common';
import {
  Args,
  Query,
  // Parent,
  Resolver,
  Mutation
  // ResolveField
} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {WorkspaceService} from './workspace.service';
import {WorkspaceInterceptor} from 'src/core/interceptors';

import {WorkspaceUpdateModel} from './models/workspace.update.model';

@Resolver('Workspace')
@UseFilters(GraphQLExceptionFilter)
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Query()
  async workspace(@Args('id') id: string) {
    return this.workspaceService.findById(id, {lean: true});
  }

  @Query()
  async workspaces(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.workspaceService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Query()
  @RequireLogin()
  @UseInterceptors(WorkspaceInterceptor)
  async currentWorkspace() {
    return this.workspaceService.getMyCurrentWorkspace();
  }

  @Query()
  async workspaceMarketing(@Args('id') id: string) {
    return this.workspaceService.getMarketing(id);
  }

  @Query()
  async workspaceSocialLinks(@Args('id') id: string) {
    return this.workspaceService.getSocialLinks(id);
  }

  @Query()
  async workspaceSafeKey(@Args('id') id: string) {
    return this.workspaceService.getWorkspaceSafeKey(id);
  }

  @Mutation()
  @RequireLogin()
  async updateWorkspace(
    @Args('id') id: string,
    @Args('updateModel') updateModel: WorkspaceUpdateModel
  ) {
    return this.workspaceService.updateWorkspace(id, updateModel);
  }
}
