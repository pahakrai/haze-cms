import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'ProductSkus';
export const Schema = new MongooseSchema(
  {
    product: {type: SchemaTypes.ObjectId, required: true, ref: 'Products'},
    code: {type: SchemaTypes.String, required: true},
    image: {type: SchemaTypes.ObjectId, required: false, ref: 'FileMetas'},
    specs: [
      {
        spec: {type: SchemaTypes.ObjectId, required: true, ref: 'ProductSpecs'},
        value: {type: SchemaTypes.ObjectId, required: true}
      }
    ],
    maxAllow: {type: SchemaTypes.Number, default: 0, required: true},
    currency: {type: SchemaTypes.String, required: true},
    amount: {type: SchemaTypes.Number, default: 0, required: true},
    discountAmount: {type: SchemaTypes.Number},
    idx: {type: SchemaTypes.Number, required: true, min: 1},
    qty: {type: SchemaTypes.Number, default: 0, required: true},
    validateInventory: {
      type: SchemaTypes.Boolean,
      required: true,
      default: false
    },
    isQuote: {type: SchemaTypes.Boolean, required: true, default: false},
    expiryDate: {type: SchemaTypes.Date}
  },
  {
    collection: CollectionName,
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);
