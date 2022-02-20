import {Injectable, Scope, Inject} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {InjectModel} from '@nestjs/mongoose';
import mongoose from 'mongoose';

import {IUser} from 'src/modules/User/interfaces';
import MongodbHelper from 'src/core/utils/mongodb.helper';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

import {Group, GroupModel} from './interfaces';
import {Policy} from '../Policy/interfaces';

@Injectable({scope: Scope.REQUEST})
export class GroupService extends BaseCRUDService<Group> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('AC_Groups')
    private readonly groupRepository: GroupModel
  ) {
    super(groupRepository, request);
  }

  async findGroup(conditions: {}) {
    const user = this.getCurrentUser<IUser>();

    return this.groupRepository.findOne({
      ...conditions,
      workspace: user?.currentWorkspace || this.getHeaderWorkspace()
    });
  }

  async findGroups(conditions: {}) {
    const user = this.getCurrentUser<IUser>();

    return this.groupRepository.find({
      ...conditions,
      workspace: user?.currentWorkspace || this.getHeaderWorkspace()
    });
  }

  public async addUserToGroups(
    userId: string,
    groups: string[]
  ): Promise<Group[]> {
    const user = this.getCurrentUser<IUser>();
    const workspaceId = user?.currentWorkspace || this.getHeaderWorkspace();
    return this.updateMany(
      {
        _id: {$in: groups},
        workspace: workspaceId
      },
      {$push: {users: userId}}
    );
  }

  public async removeUserFromGroups(
    userId: string,
    groups: string[]
  ): Promise<Group[]> {
    const user = this.getCurrentUser<IUser>();
    const workspaceId = user?.currentWorkspace || this.getHeaderWorkspace();
    return this.updateMany(
      {
        _id: {$in: groups},
        workspace: workspaceId
      },
      {$pull: {users: userId}}
    );
  }

  public async duplicateName(name: string, id?: string): Promise<boolean> {
    const user = this.getCurrentUser<IUser>();
    const conditions: any = {};

    conditions.name = name;
    conditions.workspace = user.currentWorkspace;
    if (id && id !== 'undefined' && id !== 'null') {
      conditions._id = {$ne: id};
    }

    const group = await this.groupRepository.findOne(conditions);
    return !!group;
  }

  /**
   * find group by user ID
   * @param userId user._id
   */
  public async findByUserId(userId: string) {
    return this.groupRepository
      .find({users: new mongoose.Types.ObjectId(userId)})
      .populate({path: 'policies'})
      .lean()
      .exec();
  }

  /**
   * find group Policies by user ID
   * @param userId user._id
   */
  public async getPoliciesByUserId(userId: string): Promise<Array<any> | null> {
    const groups = await this.findByUserId(userId);
    return groups
      .map(group =>
        (group.policies as Policy[]).map(policy => ({
          ...policy,
          group: group.name
        }))
      )
      .reduce((preVal, curVal) => {
        preVal = preVal.concat(curVal);
        return preVal;
      }, []);
  }

  /**
   * group req.query to where
   * @param query req.query from request
   */
  public _castQuery(queries: any): any {
    const {
      name,
      users,
      policies,
      policiesNotIn,
      workspace,
      createdAtFr,
      createdAtTo,
      utcoffset,
      q
    } = queries;
    const query: any = {
      $and: []
    };

    if (name) {
      query.$and.push({name: new RegExp(name, 'i')});
    }

    if (q) {
      query.$and.push({name: new RegExp(q, 'i')});
    }

    if (Array.isArray(users)) {
      query.$and.push({users: {$in: users}});
    }

    if (Array.isArray(policies)) {
      query.$and.push({policies: {$in: policies}});
    }

    if (Array.isArray(policiesNotIn)) {
      query.$and.push({policies: {$nin: policiesNotIn}});
    }

    if (createdAtFr || createdAtTo) {
      const createdAtlDateQuery = MongodbHelper.formatDateQueryRange(
        createdAtFr,
        createdAtTo,
        utcoffset
      );
      if (createdAtlDateQuery) {
        query.$and.push({createdAt: createdAtlDateQuery});
      }
    }
    if (workspace) {
      query.$and.push({workspace});
    }
    if (query.$and && query.$and.length === 0) {
      delete query.$and;
    }
    return query;
  }
}
