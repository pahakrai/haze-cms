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
import {TagImageService} from './tagImage.service';

@Resolver('TagImage')
@UseFilters(GraphQLExceptionFilter)
export class TagImageResolver {
  constructor(private readonly tagImageService: TagImageService) {}

  @ResolveField('image')
  async getImage(@Parent() tagImage) {
    const {image} = await this.tagImageService._populate(tagImage, ['image']);
    return image;
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() tagImage) {
    if (!tagImage.workspace) {
      return null;
    }
    const {workspace} = await this.tagImageService._populate(tagImage, [
      'workspace'
    ]);
    return workspace;
  }

  @Query()
  async tagImage(@Args('id') id: string) {
    const result = await this.tagImageService.findById(id, {lean: true});
    return result;
  }

  @Query()
  async tagImages(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.tagImageService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createTagImage(@Args('tagImageCreateModel') tagImageCreateModel) {
    return this.tagImageService.create(tagImageCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateTagImage(
    @Args('id') id: string,
    @Args('tagImageUpdateModel') tagImageUpdateModel
  ) {
    return this.tagImageService.update(id, tagImageUpdateModel, {lean: true});
  }
}
