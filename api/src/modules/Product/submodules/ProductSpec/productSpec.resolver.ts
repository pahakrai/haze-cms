import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Mutation,
  Resolver,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import {
  GraphQLExceptionFilter,
  GqlLocaleDecorator,
  RequireLogin
} from 'src/core';
import {ProductSpecService} from './productSpec.service';

@Resolver('ProductSpec')
@UseFilters(GraphQLExceptionFilter)
export class ProductSpecResolver {
  constructor(private readonly productSpecService: ProductSpecService) {}

  @ResolveField('name')
  getName(@Parent() productSpec, @GqlLocaleDecorator() locale) {
    return productSpec.name[locale.getLanguage()];
  }

  @ResolveField('values')
  getValues(@Parent() productSpec, @GqlLocaleDecorator() locale) {
    return productSpec.values.map(({_id, name}) => ({
      _id,
      name: name[locale.getLanguage()]
    }));
  }

  @ResolveField('product')
  async getProduct(@Parent() productSpec) {
    if (!productSpec.product) {
      return null;
    }

    const {product} = await this.productSpecService._populate(productSpec, [
      'product'
    ]);

    return product;
  }

  @ResolveField('icon')
  async getIcon(@Parent() productSpec) {
    if (!productSpec.icon) {
      return null;
    }
    const {icon} = await this.productSpecService._populate(productSpec, [
      'icon'
    ]);
    return icon;
  }

  @ResolveField('activeIcon')
  async getActiveIcon(@Parent() productSpec) {
    if (!productSpec.activeIcon) {
      return null;
    }
    const {activeIcon} = await this.productSpecService._populate(productSpec, [
      'activeIcon'
    ]);
    return activeIcon;
  }

  @Query()
  async productSpec(@Args('id') id: string) {
    return this.productSpecService.findById(id, {lean: true});
  }

  @Query()
  async productSpecs(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.productSpecService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createProductSpec(
    @Args('productSpecCreateModel') productSpecCreateModel
  ) {
    return this.productSpecService.create(productSpecCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateProductSpec(
    @Args('id') id: string,
    @Args('productSpecUpdateModel') productSpecUpdateModel
  ) {
    return this.productSpecService.update(id, productSpecUpdateModel, {
      lean: true
    });
  }
}
