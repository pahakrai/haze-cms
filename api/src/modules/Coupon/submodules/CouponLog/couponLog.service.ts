import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  CouponLogCreateModel,
  CouponLogUpdateModel,
  CouponLogSearchModel
} from './models';
import {CouponLog, CouponLogModel} from './interfaces';
import {IUser} from 'src/modules/User';

@Injectable({scope: Scope.REQUEST})
export class CouponLogService extends BaseCRUDService<
  CouponLog,
  CouponLogCreateModel,
  CouponLogUpdateModel,
  CouponLogSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('CouponLogs')
    private readonly couponLogRepository: CouponLogModel
  ) {
    super(couponLogRepository, request);
  }

  public _castQuery(searchModel: CouponLogSearchModel) {
    const query: any = {};
    const {user, coupon} = searchModel;
    const currentUser = this.getCurrentUser<IUser>();

    // handle workspace
    const workspace = currentUser?.currentWorkspace
      ? currentUser.currentWorkspace.toHexString()
      : this.getHeaderWorkspace();

    if (user) {
      query.user = user;
    }
    if (coupon) {
      query.coupon = coupon;
    }
    query.workspace = workspace;

    return query;
  }
}
