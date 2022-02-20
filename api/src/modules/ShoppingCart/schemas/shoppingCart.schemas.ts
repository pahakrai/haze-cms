import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

const ShoppingCartItemSchema = new MongooseSchema({
  product: {type: SchemaTypes.ObjectId, required: true, ref: 'Products'},
  productSku: {type: SchemaTypes.ObjectId, required: true, ref: 'ProductSkus'},
  qty: {type: SchemaTypes.Number, default: 1, min: 1}
});

export const CollectionName = 'ShoppingCarts';
export const Schema = new MongooseSchema(
  {
    // owner of the cart
    user: {type: SchemaTypes.ObjectId, required: true, ref: 'Users'},
    // cart item list
    items: [ShoppingCartItemSchema]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
