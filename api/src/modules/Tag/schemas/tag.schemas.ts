import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'Tags';
export const Schema = new MongooseSchema(
  {
    // hash tag text
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    text: {type: SchemaTypes.String, required: true},
    refType: {type: SchemaTypes.String, required: true},
    ref: {type: SchemaTypes.ObjectId, refPath: 'refType'}
  },
  {
    collection: CollectionName,
    timestamps: true,
    toJSON: {virtuals: true}
  }
);
