/* eslint-disable max-len */
import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  WorkspacePhoneRegionCreateModel,
  WorkspacePhoneRegionUpdateModel,
  WorkspacePhoneRegionSearchModel
} from './models';
import {IWorkspacePhoneRegion, IWorkspacePhoneRegionModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class WorkspacePhoneRegionService extends BaseCRUDService<
  IWorkspacePhoneRegion,
  WorkspacePhoneRegionCreateModel,
  WorkspacePhoneRegionUpdateModel,
  WorkspacePhoneRegionSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WorkspacePhoneRegions')
    private readonly workspacePhoneRegionRepository: IWorkspacePhoneRegionModel
  ) {
    super(workspacePhoneRegionRepository, request);
  }

  public _castQuery(searchModel: WorkspacePhoneRegionSearchModel) {
    const query: any = {$and: []};
    const {q, workspace} = searchModel;

    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      workspace;

    if (q) {
    }

    query.$and.push({workspace: {$in: workspaceId}});

    if (!query.$and.length) delete query.$and;

    return query;
  }
}
