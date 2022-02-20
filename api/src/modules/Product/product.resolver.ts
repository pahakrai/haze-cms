import {UseFilters} from '@nestjs/common';
import {Args, Query, Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {
  GqlCurrentUser,
  GqlLocaleDecorator,
  GraphQLExceptionFilter
} from 'src/core';

import {ProductService} from './product.service';
import {TagService} from '../Tag/tag.service';
import {ProductWatchService} from './submodules/ProductWatch/productWatch.service';

@Resolver('Product')
@UseFilters(GraphQLExceptionFilter)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly tagService: TagService,
    private readonly productWatchService: ProductWatchService
  ) {}

  @ResolveField('name')
  getName(@Parent() product, @GqlLocaleDecorator() locale) {
    return product.name[locale.getLanguage()];
  }

  @ResolveField('description')
  getDescription(@Parent() product, @GqlLocaleDecorator() locale) {
    return product.description[locale.getLanguage()];
  }

  @ResolveField('content')
  getContent(@Parent() product, @GqlLocaleDecorator() locale) {
    return product.content[locale.getLanguage()];
  }

  @ResolveField('types')
  async getTypes(@Parent() product, @GqlLocaleDecorator() locale) {
    const {types} = await this.productService._populate(product, ['types']);
    if (!product.types) {
      return null;
    }
    types.map(v => v.name && v.name[locale.getLanguage()]);
    types.map(v => v.description && v.description[locale.getLanguage()]);
    return types;
  }

  @ResolveField('skus')
  async getSKUs(@Parent() product) {
    const {skus} = await this.productService._populate(product, ['skus']);
    return skus;
  }

  @ResolveField('specs')
  async getProductSpecs(@Parent() product) {
    const {specs} = await this.productService._populate(product, ['specs']);
    return specs;
  }

  @ResolveField('images')
  async getImage(@Parent() product) {
    const {images} = await this.productService._populate(product, ['images']);
    return images;
  }

  @ResolveField('mediaList1')
  async getMediaList1(@Parent() product) {
    if (!(product.mediaList1?.length > 0)) {
      return [];
    }

    const {mediaList1} = await this.productService._populate(product, [
      '$mediaList1.image'
    ]);
    return mediaList1;
  }

  @ResolveField('mediaList2')
  async getMediaList2(@Parent() product) {
    if (!(product.mediaList2?.length > 0)) {
      return [];
    }

    const {mediaList2} = await this.productService._populate(product, [
      '$mediaList2.image'
    ]);
    return mediaList2;
  }

  @ResolveField('mediaList3')
  async getMediaList3(@Parent() product) {
    if (!(product.mediaList3?.length > 0)) {
      return [];
    }

    const {mediaList3} = await this.productService._populate(product, [
      '$mediaList3.image'
    ]);
    return mediaList3;
  }

  @ResolveField('category')
  async getCategory(@Parent() product) {
    if (!product._category) {
      return null;
    }

    const {category} = await this.productService._populate(product, [
      'category'
    ]);

    return category;
  }

  @ResolveField('tags')
  async getTags(@Parent() product) {
    const tags = await this.tagService.find({ref: product._id});
    return tags;
  }

  @ResolveField('placeOfOrigin')
  async getRegion(@Parent() product) {
    const {placeOfOrigin} = await this.productService._populate(product, [
      'placeOfOrigin'
    ]);
    return placeOfOrigin;
  }

  @ResolveField('isWatched')
  async getIsWatched(@Parent() product, @GqlCurrentUser() user) {
    // not login yet, always false
    if (!user) return false;

    const productWatch = await this.productWatchService.findOne({
      client: user._id,
      product: product._id
    });

    // if productWatch data exists, user watched the product
    return !!productWatch;
  }

  @Query()
  async product(@Args('id') id: string) {
    return this.productService.findById(id);
  }
  @Query()
  async productByPlatformType(
    @Args('id') id: string,
    @Args('platformTypes') platformTypes
  ) {
    return this.productService.getProductByIdAndPlatformTypes(
      id,
      platformTypes
    );
  }

  @Query()
  async products(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.productService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Query()
  async productsByTag(@Args('query') query, @Args('paginate') paginate) {
    return this.productService.findProductsByTag(query, paginate);
  }

  @Query()
  async productsMaybeYouLike(@Args('query') query, @Args('paginate') paginate) {
    return this.productService.findProductByMayLike(query, paginate);
  }

  // @Mutation()
  // @RequireLogin()
  // async createProduct(@Args('productCreateModel') productCreateModel) {
  //   return this.productService.create(productCreateModel, {lean: true});
  // }

  // @Mutation()
  // @RequireLogin()
  // async updateProduct(
  //   @Args('id') id: string,
  //   @Args('productUpdateModel') productUpdateModel
  // ) {
  //   return this.productService.update(id, productUpdateModel, {lean: true});
  // }
}
