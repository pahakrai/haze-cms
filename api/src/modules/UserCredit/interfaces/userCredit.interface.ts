import {Document, PaginateModel} from 'mongoose';
import {IUser} from 'src/modules/User';

export interface IUserCredit extends Document {
  user: IUser | IUser['_id'];
  transactionDate: Date;
  description: string;
  transactionType: string;
  amountType: string;
  currency: string;
  amount: number;
  balance: number;
}

export type IUserCreditModel = PaginateModel<IUserCredit>;
