import {SchemaTypes, Schema as MongooseSchema} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'PostComments';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspace'},
    title: {type: String, default: ''},
    comment: {type: String, required: true},
    post: {type: SchemaTypes.ObjectId, ref: 'Posts'},
    user: {type: SchemaTypes.ObjectId, ref: 'Users'},
    likes: [{type: SchemaTypes.ObjectId, ref: 'Users'}]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
