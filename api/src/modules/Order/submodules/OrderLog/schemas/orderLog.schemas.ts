import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';

export const CollectionName = 'OrderLogs';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    // cancel/release log
    type: {
      required: true,
      type: SchemaTypes.String,
      enum: Object.values(common.type.OrderLogType)
    },
    // user (can be driver/admin) who create this log
    user: {type: SchemaTypes.ObjectId, required: true, ref: 'Users'},
    // reason for cancel/release
    reason: {type: SchemaTypes.String, required: false, default: ''},
    // related order
    order: {type: SchemaTypes.ObjectId, required: true, ref: 'Orders'}
  },
  {
    collection: CollectionName,
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  }
);
