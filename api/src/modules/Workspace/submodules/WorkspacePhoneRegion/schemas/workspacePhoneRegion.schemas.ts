import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'WorkspacePhoneRegions';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    phoneRegion: {type: SchemaTypes.ObjectId, ref: 'PhoneRegions'},
    idx: {type: Number, required: true, default: 0}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
