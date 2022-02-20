import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Mutation,
  Resolver,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {ProductSkuService} from './productSku.service';

@Resolver('ProductSku')
@UseFilters(GraphQLExceptionFilter)
export class ProductSkuResolver {
  constructor(private readonly productSkuService: ProductSkuService) {}

  @ResolveField('specs')
  async getSpecs(@Parent() productSKU) {
    return productSKU.specs.map(async sp => {
      await this.productSkuService._populate(productSKU, ['$specs.spec']);
      return sp;
    });
  }

  @ResolveField('product')
  async getProduct(@Parent() productSKU) {
    if (!productSKU.product) {
      return null;
    }

    const {product} = await this.productSkuService._populate(productSKU, [
      'product'
    ]);

    return product;
  }

  @ResolveField('image')
  async getImage(@Parent() productSKU) {
    if (!productSKU.image) {
      return null;
    }

    const {image} = await this.productSkuService._populate(productSKU, [
      'image'
    ]);

    return image;
  }

  @Query()
  async productSku(@Args('id') id: string) {
    return this.productSkuService.findById(id, {lean: true});
  }

  @Query()
  async productSkus(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.productSkuService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createProductSku(@Args('productSkuCreateModel') productSkuCreateModel) {
    return this.productSkuService.create(productSkuCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateProductSku(
    @Args('id') id: string,
    @Args('productSkuUpdateModel') productSkuUpdateModel
  ) {
    return this.productSkuService.update(id, productSkuUpdateModel, {
      lean: true
    });
  }
}
