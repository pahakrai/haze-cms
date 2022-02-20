import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'AutoNumberTemplates';
export const Schema = new MongooseSchema(
  {
    // unique type
    type: {type: SchemaTypes.String, required: true},
    workspace: {type: SchemaTypes.ObjectId, default: null, ref: 'Workspaces'},
    subType: {type: SchemaTypes.String, required: false},
    prefix: {type: SchemaTypes.String, required: true},
    expression: {type: SchemaTypes.String, required: true},
    dateFormat: {type: SchemaTypes.String, required: true},
    digits: {type: SchemaTypes.Number, required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
