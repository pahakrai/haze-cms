import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'WorkspaceSubscriptionInvoices';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    invoiceNo: {type: SchemaTypes.String, required: true},
    subscription: {
      required: false,
      type: SchemaTypes.ObjectId,
      ref: 'WorkspaceSubscriptions'
    },
    stripeInvoiceId: {type: SchemaTypes.String, unique: true},
    stripeInvoiceUrl: {type: SchemaTypes.String, required: false},
    date: {type: SchemaTypes.Date, default: Date.now},
    periodFr: {type: SchemaTypes.Date, required: false},
    periodTo: {type: SchemaTypes.Date, required: false},
    currency: {type: SchemaTypes.String, default: 'HKD'},
    amount: {type: SchemaTypes.Number, required: true, min: 0},
    status: {
      required: true,
      type: SchemaTypes.String,
      enum: ['draft', 'open', 'paid', 'void', 'uncollectable']
    }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
