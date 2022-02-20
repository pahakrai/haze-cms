import {UseFilters} from '@nestjs/common';
import {Args, Query, Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {WorkspacePriceTypeService} from './workspacePriceType.service';

@RequireLogin()
@Resolver('WorkspacePriceType')
@UseFilters(GraphQLExceptionFilter)
export class WorkspacePriceTypeResolver {
  constructor(
    private readonly workspacepriceTypeService: WorkspacePriceTypeService
  ) {}

  @Query()
  async workspacePriceType(@Args('id') id: string) {
    return this.workspacepriceTypeService.findById(id, {lean: true});
  }

  @Query()
  async workspacePriceTypes(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.workspacepriceTypeService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() workspacepriceType) {
    if (!workspacepriceType.workspace) {
      return null;
    }
    const {workspace} = await this.workspacepriceTypeService._populate(
      workspacepriceType,
      ['workspace']
    );
    return workspace;
  }
}
