import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

export interface Pricing extends Document {
  _id: ObjectId;
  /**
   * unique pricing code e.g. Fare_5.5T_Diamond Hill_to_Choi_Hung
   */
  code: string;
  description: string;
  currency: string;
  amount: number;
  /**
   * price type (fixed, qty, quote)
   */
  priceType: string;
  /**
   * start date of the price
   */
  effectiveDateFr: Date;
  /**
   * end date of the price (optional)
   */
  effectiveDateTo: Date;
  isActive: boolean;
}

export type IPricingModel = PaginateModel<Pricing>;
