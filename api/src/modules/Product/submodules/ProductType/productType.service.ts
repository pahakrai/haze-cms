import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {ObjectId} from 'mongodb';
import {IUser} from '../../../User';

import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {
  ProductTypeCreateModel,
  ProductTypeUpdateModel,
  ProductTypeSearchModel
} from './models';
import {ProductType, ProductTypeModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class ProductTypeService extends BaseCRUDService<
  ProductType,
  ProductTypeCreateModel,
  ProductTypeUpdateModel,
  ProductTypeSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('ProductTypes')
    private readonly productTypeRepository: ProductTypeModel
  ) {
    super(productTypeRepository, request);
  }

  public _castQuery(searchModel: ProductTypeSearchModel) {
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    const queryAnd: any = {$and: []};
    const {q, statuses} = searchModel;
    if (q) {
      const qReg = new RegExp(q, 'i');
      const $or = [
        {
          'name.en': qReg
        },
        {
          'name.zh-hk': qReg
        },
        {
          'name.zh-cn': qReg
        },

        {
          'description.en': qReg
        },
        {
          'description.zh-hk': qReg
        },
        {
          'description.zh-cn': qReg
        },
        {
          content: qReg
        }
      ];
      queryAnd.$and.push({$or});
    }
    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    // always pass workspace as query
    queryAnd.$and.push({workspace: new ObjectId(workspace) || null});
    if (Array.isArray(statuses) && statuses.length > 0) {
      queryAnd.$and.push({status: {$in: statuses}});
    }

    if (!queryAnd.$and.length) delete queryAnd.$and;
    return queryAnd;
  }
}
