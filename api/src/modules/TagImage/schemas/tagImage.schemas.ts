import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'TagImages';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    text: {type: SchemaTypes.String, required: true},
    image: {type: SchemaTypes.ObjectId, ref: 'FileMetas'}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
