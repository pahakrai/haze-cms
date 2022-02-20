import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'AutoNumbers';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, default: null, ref: 'Workspaces'},
    prefix: {type: SchemaTypes.String, required: true, index: true},
    type: {type: SchemaTypes.String, required: true, index: true},
    subType: {type: SchemaTypes.String, required: false},
    lastNo: {type: SchemaTypes.Number, required: true, default: 0}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
