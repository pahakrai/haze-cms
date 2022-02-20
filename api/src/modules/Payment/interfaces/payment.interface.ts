import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

import {PaymentMethod} from 'src/modules/PaymentMethod/interfaces';
import {Order} from 'src/modules/Order/interfaces';
import {FileMeta} from 'src/modules/File';

interface PaymentTransaction {
  _id?: ObjectId;

  /**
   * transaction id
   */
  id?: string;

  /**
   * receipt No
   */
  receiptNo?: string;

  /**
   * transaction date
   */
  date: Date;

  /**
   * transaction amount
   */
  amount: number;

  /**
   * transaction status
   */
  status: number;

  /**
   * uploaded files for transaction proof
   * e.g. bank slip
   */
  files: FileMeta[] | FileMeta['_id'][];

  /**
   * payment method code
   */
  _paymentMethod: PaymentMethod['code'];

  /**
   * populated field
   * be sure use it after populate
   */
  paymentMethod?: PaymentMethod;

  /**
   * remarks1
   */
  remarks1?: string;

  /**
   * remarks2
   */
  remarks2?: string;
}

export interface Payment extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * related order
   */
  order: Order | Order['_id'];

  /**
   * payment status
   */
  status: number;

  /**
   * payment transactions
   */
  transactions: PaymentTransaction[];
}

export type PaymentModel = PaginateModel<Payment>;
