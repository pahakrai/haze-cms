import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';
// import {PaginatePlugin} from 'src/core/database';

const {AmountType, TransactionType} = common.type;

export const CollectionName = 'UserCredits';
export const Schema = new MongooseSchema(
  {
    user: {type: SchemaTypes.ObjectId, required: true, ref: 'Users'},
    transactionDate: {type: SchemaTypes.Date, default: Date.now},
    description: {type: SchemaTypes.String, required: false, default: ''},
    transactionType: {
      type: SchemaTypes.String,
      required: true,
      enum: Object.values(TransactionType)
    },
    amountType: {
      type: SchemaTypes.String,
      required: true,
      enum: Object.values(AmountType)
    },
    currency: {type: SchemaTypes.String, default: null},
    amount: {type: SchemaTypes.Number, required: true},
    balance: {type: SchemaTypes.Number, required: true, min: 0}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
