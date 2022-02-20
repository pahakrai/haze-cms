import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'WalletBankCardTransactions';
export const Schema = new MongooseSchema(
  {
    walletBankCard: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'WalletBankCards'
    },
    event: {type: SchemaTypes.String, required: true},
    description: {type: SchemaTypes.String, default: ''},
    change: {type: SchemaTypes.String, required: false},
    amount: {type: SchemaTypes.Number, required: true},
    stripeLog: {type: SchemaTypes.Mixed}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
