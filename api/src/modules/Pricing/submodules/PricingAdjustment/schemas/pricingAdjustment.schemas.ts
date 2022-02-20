import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';
import common from '@golpasal/common';

export const CollectionName = 'PricingAdjustments';
export const Schema = new MongooseSchema(
  {
    pricing: {type: SchemaTypes.ObjectId, required: true, ref: 'Pricings'},
    refType: {type: SchemaTypes.String, enum: ['Services'], required: false},
    // use refPath to perform dynamic referencing
    ref: {type: SchemaTypes.ObjectId, required: false, refPath: 'refType'},
    type: {
      type: SchemaTypes.String,
      required: true,
      enum: Object.values(common.type.PricingAdjustmentType)
    },
    min: {type: SchemaTypes.Number, min: 0, required: false},
    max: {type: SchemaTypes.Number, min: 0, required: false},
    remarks: {type: SchemaTypes.String, required: false, default: ''}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
