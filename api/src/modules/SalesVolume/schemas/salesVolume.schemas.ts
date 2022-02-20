import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'SalesVolumes';
export const Schema = new MongooseSchema(
  {
    time: {
      required: true,
      type: SchemaTypes.String,
      validate: /^\d{4}\-(0?[1-9]|1[012])/
    },
    currency: {type: SchemaTypes.String, required: true, default: 'HKD'},
    amount: {type: SchemaTypes.Number, required: true, default: 0},
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
