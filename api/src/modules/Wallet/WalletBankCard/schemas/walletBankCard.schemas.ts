import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'WalletBankCards';
export const Schema = new MongooseSchema(
  {
    // which wallet this card belongs to
    wallet: {type: SchemaTypes.ObjectId, required: true, ref: 'Wallets'},
    // is customer's default card?
    default: {type: SchemaTypes.Boolean, default: false},
    // short country code
    country: {type: SchemaTypes.String},
    // American Express, Diners Club, Discover,
    // JCB, MasterCard, UnionPay, Visa, or Unknown
    brand: {type: SchemaTypes.String},
    // credit, debit, prepaid, or unknown
    funding: {type: SchemaTypes.String, required: true},
    // represent last 4 digit of the card number
    last4Digit: {type: SchemaTypes.String, required: true},
    // expiry month of card
    expiryMonth: {type: SchemaTypes.Number, required: true},
    // expiry year of card
    expiryYear: {type: SchemaTypes.Number, required: true},
    // full name as shown in card
    fullName: {type: SchemaTypes.String, required: false, default: ''},
    // stripe source
    stripeSource: {type: SchemaTypes.String}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
