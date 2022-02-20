import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {NotFoundException} from 'src/core';
// interfaces & models
import {
  SubscriptionItemCreateModel,
  SubscriptionItemUpdateModel,
  SubscriptionItemSearchModel
} from './models';
import {SubscriptionItem, SubscriptionItemModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class SubscriptionItemService extends BaseCRUDService<
  SubscriptionItem,
  SubscriptionItemCreateModel,
  SubscriptionItemUpdateModel,
  SubscriptionItemSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('SubscriptionItems')
    private readonly subscriptionItemRepository: SubscriptionItemModel
  ) {
    super(subscriptionItemRepository, request);
  }

  public _castQuery(searchModel: SubscriptionItemSearchModel) {
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
   * update subscriptionItem  isActive
   * /Patch/:_id/toggle-isActive?isActive=true
   * @param param id
   * @param param isActive - true or false
   */

  public async toggleIsActive(_id: string, isActive: boolean) {
    const subscriptionItem = await this.subscriptionItemRepository.findById({
      _id
    });
    if (!subscriptionItem) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_subscriptionItem'}
      });
    }
    return this.subscriptionItemRepository
      .findByIdAndUpdate(_id, {isActive}, {new: true})
      .exec();
  }
}
