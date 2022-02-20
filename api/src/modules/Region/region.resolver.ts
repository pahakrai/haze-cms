import {UseFilters} from '@nestjs/common';
import {
  Resolver,
  ResolveField,
  Parent,
  Args,
  Query,
  Mutation
} from '@nestjs/graphql';
import {
  GqlLocaleDecorator,
  GraphQLExceptionFilter,
  RequireLogin
} from 'src/core';

import {RegionService} from './region.service';

@Resolver('Region')
@UseFilters(GraphQLExceptionFilter)
export class RegionResolver {
  constructor(private readonly regionService: RegionService) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() region) {
    const {workspace} = await this.regionService._populate(region, [
      'workspace'
    ]);
    return workspace;
  }

  @ResolveField('filemeta')
  async getImage(@Parent() region) {
    const {filemeta} = await this.regionService._populate(region, ['filemeta']);
    return filemeta;
  }

  @Query()
  async region(@Args('code') code: string) {
    return this.regionService.findOne({code: code});
  }

  @Query()
  async regions(@Args('query') query, @Args('paginate') paginate) {
    return this.regionService.findWithCursorPaginate({...query}, paginate);
  }

  @Query()
  async nearestRegion(
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number
  ) {
    return this.regionService.findNearestRegion(latitude, longitude);
  }

  @ResolveField('children')
  async getChildren(@Parent() region) {
    return this.regionService.find({parent: region._id, isActive: true});
  }

  @ResolveField('isTail')
  async isTail(@Parent() region) {
    return this.regionService.isTail(region._id, true);
  }

  @ResolveField('name')
  async getName(@Parent() region, @GqlLocaleDecorator() locale) {
    return region.name[locale.currentLanguage];
  }

  @ResolveField('parent')
  async getParent(@Parent() region) {
    return this.regionService.findById(region.parent);
  }

  @ResolveField('ancestors')
  async getAncestors(@Parent() region) {
    return this.regionService.find({_ids: region.ancestors});
  }

  @Mutation()
  @RequireLogin()
  async createRegion(@Args('regionCreateModel') regionCreateModel) {
    const createModel = {
      ...regionCreateModel,
      name: {
        en: regionCreateModel.name.en,
        'zh-hk': regionCreateModel.name.hk,
        'zh-cn': regionCreateModel.name.cn
      }
    };
    return this.regionService.create(createModel);
  }

  @Mutation()
  @RequireLogin()
  async updateRegion(
    @Args('id') id: string,
    @Args('regionUpdateModel') regionUpdateModel
  ) {
    let updateModel = {};
    if (regionUpdateModel.name) {
      updateModel = {
        ...regionUpdateModel,
        name: {
          en: regionUpdateModel.name.en,
          'zh-hk': regionUpdateModel.name.hk,
          'zh-cn': regionUpdateModel.name.cn
        }
      };
    } else {
      updateModel = {
        ...regionUpdateModel
      };
    }

    return this.regionService.update(id, updateModel, {lean: true});
  }
}
