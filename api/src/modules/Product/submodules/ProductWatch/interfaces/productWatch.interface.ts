import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Product} from 'src/modules/Product/interfaces';
import {IUser} from 'src/modules/User';

export interface ProductWatch extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * user who watch a product
   */
  client: IUser | IUser['_id'];

  /**
   * product which being watched by an user
   */
  product: Product | Product['_id'];
}

export type ProductWatchModel = PaginateModel<ProductWatch>;
