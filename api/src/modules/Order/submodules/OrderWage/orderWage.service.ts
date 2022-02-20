import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  OrderWageCreateModel,
  OrderWageUpdateModel,
  OrderWageSearchModel
} from './models';
import {OrderWage, OrderWageModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class OrderWageService extends BaseCRUDService<
  OrderWage,
  OrderWageCreateModel,
  OrderWageUpdateModel,
  OrderWageSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('OrderWages')
    private readonly orderWageRepository: OrderWageModel
  ) {
    super(orderWageRepository, request);
  }

  public _castQuery(searchModel: OrderWageSearchModel) {
    const query: any = {};
    const {q} = searchModel;

    if (q) {
    }

    return query;
  }
}
