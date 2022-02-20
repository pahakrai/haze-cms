import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core';
// interfaces & models
import {
  OrderLogCreateModel,
  OrderLogUpdateModel,
  OrderLogSearchModel
} from './models';
import {OrderLogModel, OrderLog} from './interfaces';
import {IUser} from '../../../User';

@Injectable({scope: Scope.REQUEST})
export class OrderLogService extends BaseCRUDService<
  OrderLog,
  OrderLogCreateModel,
  OrderLogUpdateModel,
  OrderLogSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('OrderLogs')
    private readonly orderLogRepository: OrderLogModel
  ) {
    super(orderLogRepository, request);
  }

  public _castQuery(searchModel: OrderLogSearchModel) {
    const query: any = {};
    const {types, user, order, createdAtFr, createdAtTo} = searchModel;

    const currentUser = this.getCurrentUser<IUser>();

    let workspace: string;
    // handle workspace
    if (currentUser?.currentWorkspace) {
      workspace = currentUser.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    // always pass workspace as query
    query.workspace = workspace || null;

    if (types?.length > 0) {
      query.type = {$in: types};
    }
    if (user) {
      query.user = user;
    }
    if (order) {
      query.order = order;
    }
    if (createdAtFr && createdAtTo) {
      query.createdAt = {$gte: createdAtFr, $lte: createdAtTo};
    }

    return query;
  }

  public async create(createModel: OrderLogCreateModel) {
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();

    createModel.workspace = workspace;

    return super.create(createModel, {lean: true});
  }
}
