import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'ProductWatches';
export const Schema = new MongooseSchema(
  {
    // user who watch a product
    client: {type: SchemaTypes.ObjectId, ref: 'Users', required: true},
    // product which being watched by an user
    product: {type: SchemaTypes.ObjectId, ref: 'Products', required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
