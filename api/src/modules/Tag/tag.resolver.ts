import {UseFilters} from '@nestjs/common';
import {Args, Query, Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';
import {TagService} from './tag.service';
import {TagImageService} from '../TagImage/tagImage.service';

@Resolver('Tag')
@UseFilters(GraphQLExceptionFilter)
export class TagResolver {
  constructor(
    private readonly tagService: TagService,
    private readonly tagImageService: TagImageService
  ) {}

  @ResolveField('ref')
  async getRef(@Parent() tag) {
    if (!tag.ref) {
      return null;
    }
    const {ref} = await this.tagService._populate(tag, ['ref']);
    return ref;
  }

  @ResolveField('tagImage')
  async getTagImages(@Parent() tag) {
    const tagImage = await this.tagImageService.findOne({
      text: tag.text,
      workspace: tag.workspace
    });
    return tagImage;
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() tag) {
    if (!tag.workspace) {
      return null;
    }
    const {workspace} = await this.tagService._populate(tag, ['workspace']);
    return workspace;
  }

  @Query()
  async tag(@Args('id') id: string) {
    return this.tagService.findById(id);
  }

  @Query()
  async tags(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options
  ) {
    return this.tagService.findWithCursorPaginate(query, {
      ...paginate,
      sort: options?.sort || {createdAt: -1}
    });
  }
}
