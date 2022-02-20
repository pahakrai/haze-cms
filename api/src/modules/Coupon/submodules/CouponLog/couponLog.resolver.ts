import {UseFilters} from '@nestjs/common';
import {Parent, Resolver, ResolveField} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {CouponLogService} from './couponLog.service';

@RequireLogin()
@Resolver('CouponLog')
@UseFilters(GraphQLExceptionFilter)
export class CouponLogResolver {
  constructor(private readonly couponLogService: CouponLogService) {}

  @ResolveField('user')
  async getUser(@Parent() couponLog) {
    if (!couponLog.user) {
      return null;
    }

    const {user} = await this.couponLogService._populate(couponLog, ['user']);

    return user;
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() couponLog) {
    if (!couponLog.workspace) {
      return null;
    }

    const {workspace} = await this.couponLogService._populate(couponLog, [
      'workspace'
    ]);

    return workspace;
  }

  @ResolveField('coupon')
  async getCoupon(@Parent() couponLog) {
    if (!couponLog.coupon) {
      return null;
    }

    const {coupon} = await this.couponLogService._populate(couponLog, [
      'coupon'
    ]);

    return coupon;
  }
}
