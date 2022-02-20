import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'Wallets';
export const Schema = new MongooseSchema(
  {
    email: {type: SchemaTypes.String, required: true, unique: true},
    name: {type: SchemaTypes.String, default: ''},
    type: {type: SchemaTypes.String, required: false},
    stripeCustomerId: {type: SchemaTypes.String, required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
