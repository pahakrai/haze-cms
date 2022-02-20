import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Workspace} from 'src/modules/Workspace/interfaces';
import {SubscriptionPlan} from 'src/modules/SubscriptionPlan/interfaces';

export interface WorkspaceSubscription extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * associated workspace
   */
  workspace: Workspace | Workspace['_id'];

  /**
   * selected plan
   */
  subscriptionPlan: SubscriptionPlan | SubscriptionPlan['_id'];

  /**
   * subscription status
   */
  status: string;

  /**
   * stripe subscription id
   */
  stripeSubscriptionId: string;

  // generated by mongoose
  /**
   * create time of this document
   */
  createdAt: Date;

  /**
   * update time of this document
   */
  updatedAt: Date;
}

export type WorkspaceSubscriptionModel = PaginateModel<WorkspaceSubscription>;
