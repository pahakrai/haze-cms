import {Document, Types} from 'mongoose';

export interface IWalletBalanceTransaction extends Document {
  _id: Types.ObjectId;
  walletBalance: string;
  event: string;
  description: string;
  change: number;
  amount: number;
  updatedAt: Date;
  createdAt: Date;
}
