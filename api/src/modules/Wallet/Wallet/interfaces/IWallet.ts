import {Document, Types} from 'mongoose';

export interface IWallet extends Document {
  _id: Types.ObjectId;
  email: string;
  name: string;
  type: string;
  stripeCustomerId: string;
}
