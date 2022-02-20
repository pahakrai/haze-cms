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

import {SalesVolumeService} from './salesVolume.service';

@RequireLogin()
@Resolver('SalesVolume')
@UseFilters(GraphQLExceptionFilter)
export class SalesVolumeResolver {
  constructor(private readonly salesVolumeService: SalesVolumeService) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() salesVolume) {
    const {workspace} = await this.salesVolumeService._populate(salesVolume, [
      'workspace'
    ]);
    return workspace;
  }

  @Query()
  async salesVolume(@Args('id') id: string) {
    return this.salesVolumeService.findById(id, {lean: true});
  }

  @Query()
  async salesVolumes(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.salesVolumeService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  async createSalesVolume(
    @Args('salesVolumeCreateModel') salesVolumeCreateModel
  ) {
    return this.salesVolumeService.createSalesVolume(salesVolumeCreateModel);
  }

  @Mutation()
  async updateSalesVolume(
    @Args('id') id: string,
    @Args('salesVolumeUpdateModel') salesVolumeUpdateModel
  ) {
    return this.salesVolumeService.updateSalesVolume(
      id,
      salesVolumeUpdateModel
    );
  }
}
