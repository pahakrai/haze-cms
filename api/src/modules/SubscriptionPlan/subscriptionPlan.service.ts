import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';

import {BaseCRUDService} from 'src/core/layers';
import {NotFoundException} from 'src/core';
// interfaces & models
import {
  SubscriptionPlanCreateModel,
  SubscriptionPlanUpdateModel,
  SubscriptionPlanSearchModel
} from './models';
import {SubscriptionPlan, SubscriptionPlanModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class SubscriptionPlanService extends BaseCRUDService<
  SubscriptionPlan,
  SubscriptionPlanCreateModel,
  SubscriptionPlanUpdateModel,
  SubscriptionPlanSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('SubscriptionPlans')
    private readonly subscriptionPlanRepository: SubscriptionPlanModel
  ) {
    super(subscriptionPlanRepository, request);
  }

  public _castQuery(searchModel: SubscriptionPlanSearchModel) {
    const query: any = {};
    const {q} = searchModel;

    if (q) {
      const qReg = new RegExp(q, 'i');
      query.$or = [
        {
          'name.en': qReg
        },
        {
          'name.zh-cn': qReg
        },
        {
          'name.zh-hk': qReg
        },
        {
          'description.en': qReg
        },
        {
          'description.zh-cn': qReg
        },
        {
          'description.zh-hk': qReg
        },
        {
          code: qReg
        }
      ];
    }

    return query;
  }

  /**
   * update subscriptionPlan  isActive
   * /Patch/:_id/toggle-isActive?isActive=true
   * @param param id
   * @param param isActive - true or false
   */

  public async toggleIsActive(_id: string, isActive: boolean) {
    const subscriptionPlan = await this.subscriptionPlanRepository.findById({
      _id
    });
    if (!subscriptionPlan) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_subscriptionPlan'}
      });
    }
    return this.subscriptionPlanRepository
      .findByIdAndUpdate(_id, {isActive}, {new: true})
      .exec();
  }
}
