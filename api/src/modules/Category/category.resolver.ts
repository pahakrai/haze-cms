import {UseFilters, UseInterceptors} from '@nestjs/common';
import {Args, Query, Resolver, ResolveField, Parent} from '@nestjs/graphql';
import {GraphQLExceptionFilter, GqlLocaleDecorator} from 'src/core';
import {CategoryService} from './category.service';
import {WorkspaceInterceptor} from 'src/core/interceptors';

@Resolver('Category')
@UseFilters(GraphQLExceptionFilter)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @ResolveField('icon')
  async getIcon(@Parent() category) {
    if (!category.icon) {
      return null;
    }
    const {icon} = await this.categoryService._populate(category, ['icon']);
    return icon;
  }

  @ResolveField('name')
  getName(@Parent() category, @GqlLocaleDecorator() locale) {
    return category.name[locale.getLanguage()];
  }

  @ResolveField('parent')
  async getParent(@Parent() category) {
    if (!category.parent) {
      return null;
    }
    const {parent} = await this.categoryService._populate(category, ['parent']);
    return parent;
  }

  @ResolveField('ancestors')
  async getAncestors(@Parent() category) {
    if (!category.ancestors) {
      return null;
    }

    const {ancestors} = await this.categoryService._populate(category, [
      'ancestors'
    ]);

    return ancestors;
  }

  @ResolveField('children')
  async getChildren(@Parent() category) {
    return this.categoryService.find({parent: category._id, isActive: true});
  }

  @ResolveField('isTail')
  async isTail(@Parent() category) {
    return this.categoryService.isTail(category._id, true);
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() category) {
    return category?.workspace
      ? this.categoryService._populate(category, ['workspace'])
      : null;
  }

  @Query()
  @UseInterceptors(WorkspaceInterceptor)
  async category(@Args('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Query()
  @UseInterceptors(WorkspaceInterceptor)
  async categories(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options
  ) {
    return this.categoryService.findWithCursorPaginate(query, {
      ...(paginate || {}),
      sort: options?.sort || {idx: 1} // default sort by idx
    });
  }
}
