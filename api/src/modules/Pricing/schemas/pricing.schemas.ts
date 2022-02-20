import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'Pricings';
export const Schema = new MongooseSchema(
  {
    // unique pricing code e.g. Fare_5.5T_Diamond Hill_to_Choi_Hung
    code: {type: SchemaTypes.String, required: true},
    description: {type: SchemaTypes.String, default: ''},
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces', required: true},
    currency: {type: SchemaTypes.String, default: 'HKD'},
    amount: {type: SchemaTypes.Number, default: 0},
    // price type (fixed, qty, quote)
    priceType: {
      type: SchemaTypes.String,
      required: true,
      enum: Object.values(common.type.PriceType)
    },
    // start date of the price
    effectiveDateFr: {type: SchemaTypes.Date, default: Date.now},
    // end date of the price (optional)
    effectiveDateTo: {type: SchemaTypes.Date, required: false},
    isActive: {type: SchemaTypes.Boolean, default: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
