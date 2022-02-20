import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';

import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {IUser} from '../User';
// interfaces & models
import {
  LanguageCreateModel,
  LanguageUpdateModel,
  LanguageSearchModel
} from './models';
import {Language, LanguageModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class LanguageService extends BaseCRUDService<
  Language,
  LanguageCreateModel,
  LanguageUpdateModel,
  LanguageSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Languages') private readonly languageRepository: LanguageModel
  ) {
    super(languageRepository, request);
  }

  public _castQuery(searchModel: LanguageSearchModel) {
    const query: any = {};
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    const {q, isActive, types} = searchModel;

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }

    query.workspace = workspace ? workspace : null;
    if (types?.length > 0) {
      query.types = {$in: types};
    }
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
        }
      ];
    }
    if (typeof isActive === 'boolean') {
      query.isActive = isActive;
    }

    return query;
  }
}
