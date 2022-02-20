import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'ProductReviews';
export const Schema = new MongooseSchema(
  {
    // workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    client: {type: SchemaTypes.ObjectId, ref: 'Users', required: true},
    order: {type: SchemaTypes.ObjectId, ref: 'Orders', required: true},
    product: {type: SchemaTypes.ObjectId, ref: 'Products', required: true},
    rating: {type: SchemaTypes.Number, min: 0, max: 100, default: 0},
    comment: {type: SchemaTypes.String, default: ''}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
