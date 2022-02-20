import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Product} from 'src/modules/Product/interfaces';
import {IProductSku} from 'src/modules/Product/submodules/ProductSku/interfaces';

interface OrderProductItem {
  /**
   * product id for item
   */
  product: Product | Product['_id'];

  /**
   * product SKU for item
   */
  productSKU: IProductSku | IProductSku['_id'];

  qty: number;

  currency: string;

  amount: number;
}

export interface OrderProduct extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * order product items
   */
  items: OrderProductItem[];

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

export type OrderProductModel = PaginateModel<OrderProduct>;