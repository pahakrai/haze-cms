import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {PaymentMethod} from 'src/modules/PaymentMethod/interfaces/paymentMethod.interface';
import {Workspace} from 'src/modules/Workspace/interfaces';

export interface WorkspacePaymentMethod extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  workspace: Workspace | Workspace['_id'];

  /**
   * payment method
   */
  paymentMethod: PaymentMethod | PaymentMethod['_id'];

  /**
   * gateway url (e.g. PayPal, UnionPay)
   */
  url: string;

  isActive: boolean;

  /**
   * supported platform (web/app/admin..etc)
   */
  platforms: string[];

  /**
   * any public/private credentail for the payment gateway
   */
  credential: any;

  /**
   * default currency
   */
  defaultCurrency: string;

  /**
   * charged by service provider
   * e.g. PayPal charge 4% for each transaction
   */
  chargeValue: number;

  /**
   * display symbol for chargeValue
   */
  chargeSymbol: string;

  /**
   * special chagre (fixed value) by service provider
   * e.g. marked price = original * (chargeValue+100)/100 + adminCharge
   */
  adminCharge: number;

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

export type WorkspacePaymentMethodModel = PaginateModel<WorkspacePaymentMethod>;
