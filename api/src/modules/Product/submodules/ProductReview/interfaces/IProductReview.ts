import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Order} from 'src/modules/Order/interfaces';
import {Product} from 'src/modules/Product/interfaces';
import {IUser} from 'src/modules/User';

export interface IProductReview extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  // workspace

  /**
   * client who create review
   */
  client: IUser | IUser['_id'];

  /**
   * order that link client and product
   */
  order: Order | Order['_id'];

  /**
   * product that review for
   */
  product: Product | Product['_id'];

  /**
   * rating given by client
   */
  rating: number;

  /**
   * (optional) comment
   */
  comment: string;
}

export type IProductReviewModel = PaginateModel<IProductReview>;
