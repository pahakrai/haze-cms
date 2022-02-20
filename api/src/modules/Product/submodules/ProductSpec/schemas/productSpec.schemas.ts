import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'ProductSpecs';
export const Schema = new MongooseSchema(
  {
    product: {type: SchemaTypes.ObjectId, ref: 'Products', required: true},
    name: LocalizeStringSchema,
    icon: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
    activeIcon: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
    values: [
      {
        _id: {type: SchemaTypes.ObjectId},
        name: LocalizeStringSchema
      }
    ]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
