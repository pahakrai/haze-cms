import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  // Parent,
  Mutation,
  Resolver
  // ResolveField
} from '@nestjs/graphql';

import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {PhoneRegionService} from './phoneRegion.service';

@Resolver('PhoneRegion')
@UseFilters(GraphQLExceptionFilter)
export class PhoneRegionResolver {
  constructor(private readonly phoneRegionService: PhoneRegionService) {}

  // Example for resolve field (populate field)
  // @ResolveField('abc')
  // async getAbc(@Parent() phoneRegion) {
  //   if (!phoneRegion.abc) {
  //     return null;
  //   }
  //
  //   const {abc} = await this.phoneRegionService._populate(phoneRegion, ['abc']);
  //
  //   return abc
  // }

  @Query()
  async phoneRegion(@Args('id') id: string) {
    return this.phoneRegionService.findById(id, {lean: true});
  }

  @Query()
  async phoneRegions(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.phoneRegionService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createPhoneRegion(
    @Args('phoneRegionCreateModel') phoneRegionCreateModel
  ) {
    return this.phoneRegionService.create(phoneRegionCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updatePhoneRegion(
    @Args('id') id: string,
    @Args('phoneRegionUpdateModel') phoneRegionUpdateModel
  ) {
    return this.phoneRegionService.update(id, phoneRegionUpdateModel, {
      lean: true
    });
  }
}
