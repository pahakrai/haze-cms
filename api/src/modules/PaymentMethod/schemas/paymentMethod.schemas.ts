import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'PaymentMethods';
export const Schema = new MongooseSchema(
  {
    code: {type: SchemaTypes.String, required: true, unique: true},
    name: LocalizeStringSchema,
    isActive: {type: SchemaTypes.Boolean, default: true}
  },
  {
    collection: '',
    timestamps: true
  }
);
