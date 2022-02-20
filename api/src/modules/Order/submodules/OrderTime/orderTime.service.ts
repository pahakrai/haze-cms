import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {ObjectId} from 'mongodb';

// interfaces & models
import {
  OrderTimeCreateModel,
  OrderTimeUpdateModel,
  OrderTimeSearchModel
} from './models';
import {OrderTime, OrderTimeModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class OrderTimeService extends BaseCRUDService<
  OrderTime,
  OrderTimeCreateModel,
  OrderTimeUpdateModel,
  OrderTimeSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('OrderTimes')
    private readonly orderTimeRepository: OrderTimeModel
  ) {
    super(orderTimeRepository, request);
  }

  public _castQuery(searchModel: OrderTimeSearchModel) {
    const query: any = {$and: []};
    const {q, order} = searchModel;

    if (q) {
    }
    if (order) {
      query.$and.push({order: new ObjectId(order)});
    }

    if (query?.$and?.length === 0) {
      return {};
    }
    return query;
  }
}
