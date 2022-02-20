import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Resolver,
  ResolveField,
  Mutation
} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {CouponService} from './coupon.service';

@Resolver('Coupon')
@UseFilters(GraphQLExceptionFilter)
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @ResolveField('logs')
  async getLogs(@Parent() coupon) {
    const {logs} = await this.couponService._populate(coupon, ['logs']);

    return logs;
  }

  @ResolveField('images')
  async images(@Parent() coupon) {
    const {images} = await this.couponService._populate(coupon, ['images']);
    return images;
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() coupon) {
    if (!coupon.workspace) {
      return null;
    }
    const {workspace} = await this.couponService._populate(coupon, [
      'workspace'
    ]);
    return workspace;
  }

  @Query()
  async coupon(@Args('id') id: string) {
    return this.couponService.findById(id, {lean: true});
  }

  @Query()
  async coupons(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.couponService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async redeemCoupon(@Args('code') code, @Args('model') model) {
    return this.couponService.redeemCoupon(code, model);
  }

  // @Mutation()
  // @RequireLogin()
  // async createCoupon(
  //   @Args('files') files,
  //   @Args('couponCreateModel') couponCreateModel
  // ) {
  //   const uploadedFiles = await Promise.all(
  //     files.map(file => processUpload(file))
  //   );
  //   const post = await this.couponService.create(
  //     couponCreateModel,
  //     uploadedFiles
  //   );
  //   return post;
  // }
}
