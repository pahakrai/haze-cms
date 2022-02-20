import {SchemaTypes, Schema as MongooseSchema} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'WalletBalances';
export const Schema = new MongooseSchema(
  {
    wallet: {type: SchemaTypes.ObjectId, required: true, ref: 'Wallets'},
    type: {type: SchemaTypes.String, required: false},
    amount: {type: SchemaTypes.Number, required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
