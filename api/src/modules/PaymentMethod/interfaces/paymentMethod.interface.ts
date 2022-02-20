import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {LocalizeString} from 'src/core';

export interface PaymentMethod extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * unique code
   */
  code: string;

  /**
   * payment method name
   */
  name: LocalizeString;

  /**
   * whether this method is active
   */
  isActive: boolean;
}

export type PaymentMethodModel = PaginateModel<PaymentMethod>;
