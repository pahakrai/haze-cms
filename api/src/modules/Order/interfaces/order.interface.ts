import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

import {Service} from 'src/modules/Service/interfaces';

import {Workspace} from 'src/modules/Workspace/interfaces';
import {OrderProduct} from '../submodules/OrderProduct/interfaces';
import {OrderTime} from '../submodules/OrderTime/interfaces';
import {IUser} from 'src/modules/User';
import {Address} from 'src/modules/Address/interfaces';
import {Quotation} from 'src/modules/Quotation/interfaces';

/**
 * consignee(receiver) info
 */
export interface OrderContact {
  /**
   * consignee name
   */
  name: string;

  /**
   * consignee phone no.
   */
  phone: string;
}

export interface OrderService {
  /**
   * service id/populated service
   */
  service: Service | Service['_id'];

  /**
   * value
   */
  value: any;

  /**
   * remarks
   */
  remarks: string;

  /**
   * quotation price
   */
  quotedPrice: number;
}

export interface OrderChargeService {
  /**
   * service id/populated service
   */
  service: Service | Service['_id'];

  /**
   * is quoted service
   */
  isQuotation: boolean;

  /**
   * amount
   */
  amount: number;
}

interface OrderChargeCoupon {
  /**
   * coupon code
   */
  code: string;

  /**
   * redeem amount
   */
  amount: number;
}

export interface OrderChargeOther {
  description: string;
  amount: number;
}

export interface OrderCharge {
  /**
   * total amount
   */
  totalAmount: number;

  /**
   * this order charge has any quotation price
   */
  hasQuote: boolean;

  /**
   * currency
   */
  currency: string;

  /**
   * other tips
   */
  tips: number;

  /**
   * base price
   */
  base: number;

  /**
   * charge type of base price
   * can be fixed/on demand/free ride..etc
   */
  basePriceType: string;

  /**
   * service charge
   */
  services: OrderChargeService[];

  /**
   * coupons
   */
  coupons: OrderChargeCoupon[];

  /**
   * other charges
   */
  others: OrderChargeOther[];
}

export interface Order extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * generated order no.
   */
  orderNo: string;

  /**
   * quotation id if order is from an qoutation
   */
  quotation?: Quotation | Quotation['_id'];

  /**
   * order type
   * education/logistic/shopping..etc
   */
  orderType: string;

  /**
   * client who create order
   */
  client: IUser | IUser['_id'];

  /**
   * device ID of client
   */
  clientDevice: string;

  /**
   * order's workspace
   */
  workspace: Workspace | Workspace['_id'];

  /**
   * order date
   */
  date: Date;

  /**
   * billing addr and person
   */
  billingContact: Address | Address['_id'];

  /**
   * order person contact
   */
  contactAddress: Address | Address['_id'];

  /**
   * order clinet contact
   */
  contact: OrderContact;

  /**
   * order consignee (receiver) contact
   */
  consignee: OrderContact;

  /**
   * order status
   */
  status: number;

  /**
   * service list
   */
  services: OrderService[];

  /**
   * optional remarks
   */
  remarks: string;

  creditRequired: number;

  /**
   * order amount
   */
  charge: OrderCharge;

  // virtual populate fields
  /**
   * proudct list of order
   */
  product: OrderProduct;

  /**
   * time related stuff
   * e.g. order expiry, duration, schedule time
   */
  time: OrderTime;

  createdAt: Date;

  updatedAt: Date;
}

export type OrderModel = PaginateModel<Order>;
