import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

import common from '@golpasal/common';

export const CollectionName = 'Checkouts';
export const Schema = new MongooseSchema(
  {
    status: {
      required: true,
      type: SchemaTypes.Number,
      default: common.status.CheckoutStatus.PENDING
    },
    expireAt: {type: SchemaTypes.Date, default: null},
    // productInventoryLogs: [{type: SchemaTypes.ObjectId}],
    order: {type: SchemaTypes.ObjectId, ref: 'Orders'},
    payment: {type: SchemaTypes.ObjectId, ref: 'Payments'}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
