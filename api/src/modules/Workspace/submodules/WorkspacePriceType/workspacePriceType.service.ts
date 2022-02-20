import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  WorkspacePriceTypeCreateModel,
  WorkspacePriceTypeUpdateModel,
  WorkspacePriceTypeSearchModel
} from './models';
import {IUser} from 'src/modules/User';
import {WorkspacePriceType, WorkspacePriceTypeModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class WorkspacePriceTypeService extends BaseCRUDService<
  WorkspacePriceType,
  WorkspacePriceTypeCreateModel,
  WorkspacePriceTypeUpdateModel,
  WorkspacePriceTypeSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WorkspacePriceTypes')
    private readonly workspacepriceTypeRepository: WorkspacePriceTypeModel
  ) {
    super(workspacepriceTypeRepository, request);
  }

  public _castQuery(searchModel: WorkspacePriceTypeSearchModel) {
    let workspace: string;
    const queryAnd: any = [];

    const user = this.getCurrentUser<IUser>();
    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    queryAnd.push({workspace: workspace ? workspace : null});
    return queryAnd.length > 0 ? {$and: queryAnd} : {};
  }
}
