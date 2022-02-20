import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'OrderProducts';
export const Schema = new MongooseSchema(
  {
    order: {type: SchemaTypes.ObjectId, ref: 'Orders', required: true},
    items: [
      {
        product: {type: SchemaTypes.ObjectId, ref: 'Products', required: true},
        productSKU: {
          required: true,
          ref: 'ProductSkus',
          type: SchemaTypes.ObjectId
        },
        qty: {type: SchemaTypes.Number, min: 1, required: true},
        currency: {type: SchemaTypes.String},
        amount: {type: SchemaTypes.Number, min: 0, required: true}
      }
    ]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
