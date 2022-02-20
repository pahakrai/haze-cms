import {Inject, Injectable, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {InjectModel} from '@nestjs/mongoose';

import {IUser} from 'src/modules/User/interfaces';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {WorkspaceService} from 'src/modules/Workspace/workspace.service';

import {Policy, PolicyModel} from './interfaces';

import {PolicySearchModel} from './models';

@Injectable({scope: Scope.REQUEST})
export class PolicyService extends BaseCRUDService<Policy> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('AC_Policies')
    private readonly policyRepository: PolicyModel,
    private readonly workspaceService: WorkspaceService
  ) {
    super(policyRepository, request);
  }
  async updatePolicy(conditions: {}, update: {}) {
    return this.policyRepository.findOneAndUpdate(conditions, update, {
      new: true
    });
  }

  async findPolicy(conditions: {}) {
    const user = this.getCurrentUser<IUser>();
    const workspace = await this.workspaceService.findById(
      user.currentWorkspace
    );

    return this.policyRepository.findOne({
      ...conditions,
      $or: [{workspaceTypes: workspace.type}, {workspaceAccess: workspace._id}]
    });
  }

  async findPolicies(conditions: any) {
    const {
      workspaceAccessFilter = true,
      workspaceTypesFilter = true,
      ...rest
    } = conditions;
    const user = this.getCurrentUser<IUser>();
    const workspace = await this.workspaceService.findById(
      user?.currentWorkspace || this.getHeaderWorkspace()
    );

    const $or = [];
    if (workspaceTypesFilter) {
      $or.push({workspaceTypes: workspace?.type});
    }

    if (workspaceAccessFilter) {
      $or.push({workspaceAccess: workspace?._id});
    }

    return this.policyRepository.find({
      ...rest,
      ...($or.length > 0 ? {$or} : {})
    });
  }

  public async _castQuery(queries: PolicySearchModel) {
    const query: any = {$and: []};
    const {q, action, _ids} = queries;

    const user = this.getCurrentUser<IUser>();
    const workspace = await this.workspaceService.findById(
      user?.currentWorkspace || this.getHeaderWorkspace()
    );
    if (q) {
      const qReg = new RegExp(q, 'i');
      query.$and.push({
        $or: [{name: qReg}]
      });
    }
    if (action) {
      query.$and.push({
        'Statement.Action': new RegExp(action, 'i')
      });
    }

    if (Array.isArray(_ids)) {
      // find by ids will ignore workspace type / _id
      query.$and.push({_id: {$in: _ids}});
    } else {
      if (workspace) {
        query.$and.push({
          $or: [
            {workspaceTypes: {$in: [workspace.type]}},
            {workspaceAccess: {$in: [workspace._id]}}
          ]
        });
      }
    }

    if (!query.$and.length) {
      delete query.$and;
    }

    return query;
  }
}
