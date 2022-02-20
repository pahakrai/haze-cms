import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  PricingAdjustmentCreateModel,
  PricingAdjustmentUpdateModel,
  PricingAdjustmentSearchModel
} from './models';
import {PricingAdjustmentModel, PricingAdjustment} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class PricingAdjustmentService extends BaseCRUDService<
  PricingAdjustment,
  PricingAdjustmentCreateModel,
  PricingAdjustmentUpdateModel,
  PricingAdjustmentSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('PricingAdjustments')
    private readonly pricingAdjustmentRepository: PricingAdjustmentModel
  ) {
    super(pricingAdjustmentRepository, request);
  }

  public _castQuery(searchModel: PricingAdjustmentSearchModel) {
    const query: any = {};
    const {types} = searchModel;

    if (types?.length > 0) {
      query.type = {$in: types};
    }

    return query;
  }
}
