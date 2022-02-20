import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'UserSearchHistories';
export const Schema = new MongooseSchema(
  {
    workspace: {
      type: SchemaTypes.ObjectId,
      ref: 'Workspaces',
      required: true
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'Users',
      required: true
    },
    text: {type: SchemaTypes.String, required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
