import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'PhoneRegions';
export const Schema = new MongooseSchema(
  {
    code: {type: SchemaTypes.String, required: true} // code is more appropriate than _id
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
