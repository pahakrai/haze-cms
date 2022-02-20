import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  UserLevelCreateModel,
  UserLevelUpdateModel,
  UserLevelSearchModel
} from './models';
import {UserLevel, UserLevelModel} from './interfaces';
import {IUser} from '../User';

@Injectable({scope: Scope.REQUEST})
export class UserLevelService extends BaseCRUDService<
  UserLevel,
  UserLevelCreateModel,
  UserLevelUpdateModel,
  UserLevelSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('UserLevels')
    private readonly userLevelRepository: UserLevelModel
  ) {
    super(userLevelRepository, request);
  }

  public _castQuery(searchModel: UserLevelSearchModel) {
    const query: any = {$and: []};
    const {q, isActive, userType} = searchModel;

    const currentUser = this.getCurrentUser();
    const workspace =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
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
        }
      ];
      query.$and.push({$or});
    }

    if (workspace) {
      query.$and.push({workspace: workspace || null});
    }
    if (isActive || isActive === false) {
      query.isActive = isActive;
    }
    if (userType) {
      query.userType = userType;
    }
    if (!query.$and.length) delete query.$and;

    return query;
  }

  public async create(createModel: UserLevelCreateModel) {
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();

    createModel.workspace = workspace;

    return super.create(createModel, {lean: true});
  }

  public async update(id, updateModel: UserLevelUpdateModel) {
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();

    updateModel.workspace = workspace;

    return super.update(id, updateModel, {lean: true});
  }
}
