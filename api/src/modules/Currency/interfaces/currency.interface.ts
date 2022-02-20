import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

export interface Currency extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * currency code (e.g. JPY, USD, HKD, RMB)
   */
  code: string;

  /**
   * symbol for currency
   */
  symbol: string;

  /**
   * is this currency active for user
   */
  isActive: boolean;

  // generated by mongoose
  /**
   * create time of this document
   */
  createdAt: Date;

  /**
   * update time of this document
   */
  updatedAt: Date;
}

export type CurrencyModel = PaginateModel<Currency>;
