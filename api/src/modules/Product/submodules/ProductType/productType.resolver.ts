import {UseFilters} from '@nestjs/common';
import {Args, Query, Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GqlLocaleDecorator, GraphQLExceptionFilter} from 'src/core';
import {ProductTypeService} from '../ProductType/productType.service';

@Resolver('ProductType')
@UseFilters(GraphQLExceptionFilter)
export class ProductTypeResolver {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @ResolveField('name')
  getName(@Parent() product, @GqlLocaleDecorator() locale) {
    return product.name[locale.getLanguage()];
  }

  @ResolveField('description')
  getDescription(@Parent() product, @GqlLocaleDecorator() locale) {
    return product.description[locale.getLanguage()];
  }

  @ResolveField('workspace')
  async getClient(@Parent() productType) {
    if (!productType.workspace) {
      return null;
    }

    const {workspace} = await this.productTypeService._populate(productType, [
      'workspace'
    ]);

    return workspace;
  }

  @ResolveField('images')
  async getProduct(@Parent() productType) {
    if (!productType.images) {
      return null;
    }
    const {images} = await this.productTypeService._populate(productType, [
      'images'
    ]);
    return images;
  }

  @Query()
  async productType(@Args('id') id: string) {
    return this.productTypeService.findById(id, {lean: true});
  }

  @Query()
  async productTypes(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.productTypeService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }
}
