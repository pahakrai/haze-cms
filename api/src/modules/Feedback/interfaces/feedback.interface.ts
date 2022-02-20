import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

import {Order} from 'src/modules/Order/interfaces';
import {IUser} from 'src/modules/User';
import {Product} from 'src/modules/Product/interfaces';

export interface Feedback extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * feedback from
   */
  from: IUser | IUser['_id'];

  /**
   * feedback to
   */
  to: IUser | IUser['_id'];

  /**
   * doc that give feedback to
   */
  ref: ObjectId | Order | Product;

  refType: 'Orders' | 'Products';

  /**
   * rating
   */
  rating: number;

  /**
   * optional comment written by client
   */
  comment?: string;
}

export type FeedbackModel = PaginateModel<Feedback>;
