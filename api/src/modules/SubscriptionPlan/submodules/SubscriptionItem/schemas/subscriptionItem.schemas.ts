import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'SubscriptionItems';
export const Schema = new MongooseSchema(
  {
    name: LocalizeStringSchema,
    description: LocalizeStringSchema,
    isActive: {type: SchemaTypes.Boolean, default: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
