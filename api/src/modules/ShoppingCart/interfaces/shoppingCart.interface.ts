import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

import {Product} from 'src/modules/Product/interfaces';
import {IProductSku} from 'src/modules/Product/submodules/ProductSku/interfaces';
import {IUser} from 'src/modules/User';

interface ShoppingCartItem {
  _id: string;
  product: Product | Product['_id'];
  productSku: IProductSku | IProductSku['_id'];
  quantity: number;
}

export interface ShoppingCart extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * owner of the cart
   */
  user: IUser | IUser['_id'];

  /**
   * cart item list
   */
  items: ShoppingCartItem[];
}

export type ShoppingCartModel = PaginateModel<ShoppingCart>;
