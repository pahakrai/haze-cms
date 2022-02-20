import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';
const {PlatformType} = common.type;

export const CollectionName = 'WorkspacePaymentMethods';
export const Schema = new MongooseSchema(
  {
    // workspace
    workspace: {type: SchemaTypes.ObjectId, required: true, ref: 'Workspaces'},
    // payment method
    paymentMethod: {
      required: true,
      ref: 'PaymentMethods',
      type: SchemaTypes.ObjectId
    },
    // is active
    isActive: {type: SchemaTypes.Boolean, default: false},
    // gateway url (e.g. PayPal, UnionPay)
    url: String,
    // supported platform (web/app/admin..etc)
    platforms: [
      {
        required: true,
        type: SchemaTypes.String,
        enum: Object.values(PlatformType)
      }
    ],
    // any public/private credentail for the payment gateway
    credential: {type: SchemaTypes.Mixed},
    // default currency
    defaultCurrency: {type: SchemaTypes.String, default: 'HKD'},
    // charged by service provider (e.g. PayPal charge 4% for each transaction)
    chargeValue: {type: SchemaTypes.Number, default: 0},
    // display symbol for chargeValue
    chargeSymbol: {type: SchemaTypes.String, default: '%'},
    // special chagre (fixed value) by service provider
    // e.g. marked price = original * (chargeValue+100)/100 + adminCharge
    adminCharge: {type: SchemaTypes.Number, default: 0}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
