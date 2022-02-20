import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

export const CollectionName = 'Params';
export const Schema = new MongooseSchema(
  {
    workspace: {
      ref: 'Workspaces',
      type: SchemaTypes.ObjectId,
      required: false
    },
    type: { type: String, required: true },
    description: { type: String, required: true, default: '' },
    parameters: SchemaTypes.Mixed
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
