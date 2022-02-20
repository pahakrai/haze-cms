import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'Currencies';
export const Schema = new MongooseSchema(
  {
    code: {type: SchemaTypes.String, required: true, unique: true},
    symbol: {type: SchemaTypes.String, default: '$'},
    isActive: {type: SchemaTypes.Boolean, required: true, defalut: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
