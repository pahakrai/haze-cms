import {Document, Types} from 'mongoose';

export interface IWalletBalance extends Document {
  _id: string;
  wallet: Types.ObjectId;
  type: string;
  amount: number;
  updatedAt: Date;
  createdAt: Date;
}
