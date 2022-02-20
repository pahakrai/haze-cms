import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'WalletBalanceTransactions';
export const Schema = new MongooseSchema(
  {
    walletBalance: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'WalletBalances'
    },
    event: {type: SchemaTypes.String, required: true},
    description: {type: SchemaTypes.String, default: ''},
    change: {type: SchemaTypes.String, required: false},
    amount: {type: SchemaTypes.Number, required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
