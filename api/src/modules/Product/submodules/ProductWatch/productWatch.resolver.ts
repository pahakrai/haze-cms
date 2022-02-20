import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {GraphQLExceptionFilter, GqlCurrentUser, RequireLogin} from 'src/core';
import {ProductWatchService} from './productWatch.service';
import {IUser} from 'src/modules/User';

@RequireLogin()
@Resolver('ProductWatch')
@UseFilters(GraphQLExceptionFilter)
export class ProductWatchResolver {
  constructor(private readonly productWatchService: ProductWatchService) {}

  @ResolveField('client')
  async getClient(@Parent() productWatch) {
    if (!productWatch.client) {
      return null;
    }

    const {client} = await this.productWatchService._populate(productWatch, [
      'client'
    ]);

    return client;
  }

  @ResolveField('product')
  async getProduct(@Parent() productWatch) {
    if (!productWatch.product) {
      return null;
    }
    const {product} = await this.productWatchService._populate(productWatch, [
      'product'
    ]);
    return product;
  }

  @Query()
  async productWatch(@Args('id') id: string) {
    return this.productWatchService.findById(id, {lean: true});
  }

  // @Query()
  // async productWatches(@Args('query') query, @Args('paginate') paginate) {
  //   const productWatches = await this.productWatchService.find(query);
  //   return paginateList(productWatches, paginate);
  // }

  @Query()
  async myProductWatches(
    @Args('paginate') paginate,
    @GqlCurrentUser() currentUser: IUser
  ) {
    return this.productWatchService.findWithCursorPaginate(
      {
        client: currentUser?._id?.toHexString()
      },
      paginate
    );
  }

  @Query()
  async myProductWatchExist(
    @Args('productId') productId,
    @GqlCurrentUser() currentUser: IUser
  ) {
    const watch = await this.productWatchService.findOne({
      client: currentUser?._id?.toHexString(),
      product: productId
    });
    return watch ? true : false;
  }

  @Mutation()
  async createProductWatch(
    @Args('productWatchCreateModel') productWatchCreateModel
  ) {
    return this.productWatchService.create(productWatchCreateModel, {
      lean: true
    });
  }

  @Mutation()
  async updateProductWatch(
    @Args('id') id: string,
    @Args('productWatchUpdateModel') productWatchUpdateModel
  ) {
    return this.productWatchService.update(id, productWatchUpdateModel, {
      lean: true
    });
  }

  @Mutation()
  async toggleProductWatch(
    @Args('productId') productId: string,
    @GqlCurrentUser() currentUser: IUser
  ) {
    return this.productWatchService.toggleProductWatch(
      productId,
      currentUser._id.toHexString()
    );
  }

  // NOTE: for multiple delete of product watches by currentUser
  @Mutation()
  async removeProductWatches(
    @Args('productIds') productIds: Array<string>,
    @GqlCurrentUser() currentUser: IUser
  ) {
    return this.productWatchService.removeProductWatches(
      productIds,
      currentUser._id.toHexString()
    );
  }
}
