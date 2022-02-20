import {Document, Types} from 'mongoose';

export interface IWalletBankCardTransaction extends Document {
  _id: Types.ObjectId;
  walletBankCard: string;
  event: string;
  description: string;
  change: number;
  amount: number;
  stripeLog: any;
  updatedAt: Date;
  createdAt: Date;
}
