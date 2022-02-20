import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  AddressCreateModel,
  AddressUpdateModel,
  AddressSearchModel
} from './models';
import {Address, AddressModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class AddressService extends BaseCRUDService<
  Address,
  AddressCreateModel,
  AddressUpdateModel,
  AddressSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Addresses') private readonly addressRepository: AddressModel
  ) {
    super(addressRepository, request);
  }

  public _castQuery(searchModel: AddressSearchModel) {
    const queryAnd: Array<any> = [];
    const {q, ref, refType} = searchModel;

    if (q) {
    }

    if (refType) {
      queryAnd.push({refType});
    }

    if (ref) {
      queryAnd.push({ref: new mongoose.Types.ObjectId(ref)});
    }

    return queryAnd.length > 0 ? {$and: queryAnd} : {};
  }

  public async findOne(
    query: AddressSearchModel & {_id?: string}
  ): Promise<Address> {
    const updatedQuery: any = query || {};
    return this.addressRepository
      .findOne({
        ...updatedQuery
      })
      .lean(true);
  }

  public async findOneAndUpdate(
    query: AddressSearchModel & {_id: string},
    updateModel: AddressUpdateModel
  ) {
    const prepQuery: any = {...query};
    return this.addressRepository
      .findOneAndUpdate(prepQuery, updateModel as any)
      .lean(true)
      .session(this.getMongoSession())
      .exec();
  }
}
