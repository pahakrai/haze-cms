import {Document, Types} from 'mongoose';

export interface IWalletBankCard extends Document {
  _id: Types.ObjectId;
  wallet: string;
  default: boolean;
  country: string;
  brand: string;
  funding: string;
  last4Digit: string;
  expiryMonth: number;
  expiryYear: number;
  fullName: string;
  stripeSource: string;
}
