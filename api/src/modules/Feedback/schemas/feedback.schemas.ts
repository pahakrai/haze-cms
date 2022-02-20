import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'Feedbacks';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces', required: true},
    from: {type: SchemaTypes.ObjectId, ref: 'Users', required: true},
    to: {type: SchemaTypes.ObjectId, ref: 'Users', required: true},
    refType: {
      required: true,
      type: SchemaTypes.String,
      enum: ['Orders', 'Products']
    },
    ref: {type: SchemaTypes.ObjectId, refPath: 'refType', required: true},
    rating: {type: SchemaTypes.Number, default: 0, min: 0, max: 100},
    comment: {type: SchemaTypes.String, default: ''}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
