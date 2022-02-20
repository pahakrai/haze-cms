import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

import {IUser} from 'src/modules/User';
import {Order} from 'src/modules/Order/interfaces';
import {Workspace} from 'src/modules/Workspace/interfaces';

export interface OrderLog extends Document {
  _id: ObjectId;

  /**
   * orderLog's workspace
   */
  workspace: Workspace | Workspace['_id'];
  /**
   * cancel/release log
   */
  type: string;

  /**
   * user (can be driver/admin) who create this log
   */
  user: IUser | IUser['_id'];

  /**
   * reason for cancel/release
   */
  reason: string;

  /**
   * related order
   */
  order: Order | Order['_id'];
}

export type OrderLogModel = PaginateModel<OrderLog>;
