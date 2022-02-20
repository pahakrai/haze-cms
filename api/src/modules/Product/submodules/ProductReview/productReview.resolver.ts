import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField,
  Context
} from '@nestjs/graphql';
import {RatingHelper, GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {WorkspaceService} from 'src/modules/Workspace/workspace.service';

import {ProductReviewService} from './productReview.service';

@Resolver('ProductReview')
@UseFilters(GraphQLExceptionFilter)
export class ProductReviewResolver {
  constructor(
    private readonly productReviewService: ProductReviewService,
    private readonly workspaceService: WorkspaceService
  ) {}

  @ResolveField('client')
  async getClient(@Parent() productReview) {
    if (!productReview.client) {
      return null;
    }

    const {client} = await this.productReviewService._populate(productReview, [
      'client'
    ]);

    return client;
  }

  @ResolveField('order')
  async getOrder(@Parent() productReview) {
    if (!productReview.order) {
      return null;
    }

    const {order} = await this.productReviewService._populate(productReview, [
      'order'
    ]);

    return order;
  }

  @ResolveField('product')
  async getProduct(@Parent() productReview) {
    if (!productReview.product) {
      return null;
    }

    const {product} = await this.productReviewService._populate(productReview, [
      'product'
    ]);

    return product;
  }

  @ResolveField('rating')
  async parseRating(@Parent() feedback, @Context() context) {
    const workspaceId = context.req.header('workspace');
    const workspace = await this.workspaceService.findById(workspaceId);

    // transform db value (0-100) to front-end value (0-5)
    return RatingHelper.castRatingToDisplay(
      feedback.rating,
      workspace.setting.ratingMaxValue
    );
  }

  @Query()
  async productReview(@Args('id') id: string) {
    return this.productReviewService.findById(id, {lean: true});
  }

  @Query()
  async productReviews(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.productReviewService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createProductReview(
    @Args('productReviewCreateModel') productReviewCreateModel
  ) {
    // transform front-end value (0-5) to db value (0-100)
    productReviewCreateModel.rating = RatingHelper.castRatingToDbValue(
      productReviewCreateModel.rating,
      5
    );

    return this.productReviewService.create(productReviewCreateModel, {
      lean: true
    });
  }

  @Mutation()
  @RequireLogin()
  async updateProductReview(
    @Args('id') id: string,
    @Args('productReviewUpdateModel') productReviewUpdateModel
  ) {
    // transform front-end value (0-5) to db value (0-100)
    productReviewUpdateModel.rating = RatingHelper.castRatingToDbValue(
      productReviewUpdateModel.rating,
      5
    );

    return this.productReviewService.update(id, productReviewUpdateModel, {
      lean: true
    });
  }
}
