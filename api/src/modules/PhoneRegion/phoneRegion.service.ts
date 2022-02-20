import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {
  PhoneRegionCreateModel,
  PhoneRegionUpdateModel,
  PhoneRegionSearchModel
} from './models';
import {PhoneRegion, PhoneRegionModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class PhoneRegionService extends BaseCRUDService<
  PhoneRegion,
  PhoneRegionCreateModel,
  PhoneRegionUpdateModel,
  PhoneRegionSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('PhoneRegions')
    private readonly phoneRegionRepository: PhoneRegionModel
  ) {
    super(phoneRegionRepository, request);
  }

  public _castQuery(searchModel: PhoneRegionSearchModel) {
    const query: any = {};
    const {q, code} = searchModel;

    if (q) {
      query.$or = [
        {
          code: new RegExp(q, 'i')
        }
      ];
    }

    if (code) {
      query.code = new RegExp(code, 'i');
    }

    return query;
  }
  // find phoneRegion by code
  public async findByCode(code: string) {
    return this.findOne({code});
  }
}
