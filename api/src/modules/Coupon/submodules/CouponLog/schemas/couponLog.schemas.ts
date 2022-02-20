import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

import {CollectionName as UserCollectionName} from 'src/modules/User/schemas/user.schemas';
import {CollectionName as CouponCollectionName} from 'src/modules/Coupon/schemas/coupon.schemas';
// eslint-disable-next-line max-len
import {CollectionName as WorkspaceCollectionName} from 'src/modules/Workspace/schemas/workspace.schemas';

export const CollectionName = 'CouponLogs';
export const Schema = new MongooseSchema(
  {
    user: {type: SchemaTypes.ObjectId, required: true, ref: UserCollectionName},
    workspace: {
      required: true,
      type: SchemaTypes.ObjectId,
      ref: WorkspaceCollectionName
    },
    coupon: {
      required: true,
      ref: CouponCollectionName,
      type: SchemaTypes.ObjectId
    }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
