import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';

const PaymentTransactionSchema = new MongooseSchema(
  {
    id: {type: SchemaTypes.String, required: false},
    // receiptNo, auto generate no.
    receiptNo: {type: SchemaTypes.String, required: false},
    date: {type: SchemaTypes.Date, default: Date.now, required: true},
    amount: {type: SchemaTypes.Number, default: 0},
    status: {type: SchemaTypes.Number, required: true},
    _paymentMethod: {type: SchemaTypes.String, required: true},
    files: [{type: SchemaTypes.ObjectId, ref: 'FileMetas', required: false}],
    remarks1: {type: SchemaTypes.String, required: false},
    remarks2: {type: SchemaTypes.String, required: false}
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

PaymentTransactionSchema.virtual('paymentMethod', {
  ref: 'PaymentMethods',
  localField: '_paymentMethod',
  foreignField: 'code',
  justOne: true
});

export const CollectionName = 'Payments';
export const Schema = new MongooseSchema(
  {
    order: {type: SchemaTypes.ObjectId, required: true, ref: 'Orders'},
    status: {
      required: true,
      type: SchemaTypes.Number,
      default: common.status.PaymentStatus.NOT_PAID
    },
    transactions: [PaymentTransactionSchema]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
