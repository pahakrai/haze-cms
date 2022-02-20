import {UseFilters, UseInterceptors} from '@nestjs/common';
import {Args, Query, Resolver, ResolveField, Parent} from '@nestjs/graphql';
import {
  GraphQLExceptionFilter,
  GqlLocaleDecorator,
  GqlWorkspaceId,
  RequireLogin
} from 'src/core';
import {WorkspaceTypeService} from './workspaceType.service';
import {WorkspaceTypeSearchModel} from './models';
import {WorkspaceInterceptor} from 'src/core/interceptors';

@Resolver('WorkspaceType')
@UseFilters(GraphQLExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class WorkspaceTypeResolver {
  constructor(private readonly workspaceTypeService: WorkspaceTypeService) {}

  @ResolveField('files')
  public getFiles(@Parent() workspaceType, @GqlLocaleDecorator() locale) {
    return workspaceType.files.map(file => ({
      name: file.name[locale.getLanguage()],
      fileType: file.fileType
    }));
  }

  @Query()
  @RequireLogin()
  async myWorkspaceType() {
    return this.workspaceTypeService.findMyWorkspaceType();
  }

  @Query()
  async workspaceType(@Args('id') id: string) {
    return this.workspaceTypeService.findById(id, {lean: true});
  }

  @Query()
  async workspaceTypes(
    @Args('query') query: WorkspaceTypeSearchModel,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.workspaceTypeService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Query()
  public async workspaceTypeRequirements(
    @Args('userType') userType: string,
    // NOTE: requirementType is optional to fetch all the requirements
    // to optimize api call
    @Args('requirementType') requirementType: string
  ) {
    return this.workspaceTypeService.getRequirements(userType, requirementType);
  }

  @Query()
  async userTypesDisplay(@GqlWorkspaceId() workspaceId: string) {
    return this.workspaceTypeService.getUserTypesDisplay(workspaceId);
  }
}
