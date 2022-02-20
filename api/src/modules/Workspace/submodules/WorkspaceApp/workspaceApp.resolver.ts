import {UseFilters} from '@nestjs/common';
import {Args, Query, Resolver, Mutation} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {WorkspaceAppService} from './workspaceApp.service';

@Resolver('WorkspaceApp')
@UseFilters(GraphQLExceptionFilter)
export class WorkspaceAppResolver {
  constructor(private readonly workspaceAppService: WorkspaceAppService) {}

  @Query()
  async getWorkspaceAppByName(@Args('name') name: string) {
    return this.workspaceAppService.findOne({name});
  }
  @Mutation()
  @RequireLogin()
  async createWorkspaceApp(
    @Args('workspaceAppCreateModel') workspaceAppCreateMdoel
  ) {
    return this.workspaceAppService.create(workspaceAppCreateMdoel);
  }

  @Mutation()
  @RequireLogin()
  async updateWorkspaceApp(
    @Args('id') id: string,
    @Args('workspaceAppUpdateModel') workspaceAppUpdateModel
  ) {
    return this.workspaceAppService.update(id, workspaceAppUpdateModel);
  }
}
