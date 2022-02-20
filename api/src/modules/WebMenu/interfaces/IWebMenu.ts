import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {IWebMenuItem} from './IWebMenu.item';

export interface IWebMenu extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;
  code: string;
  menu: IWebMenuItem[];
}

export type IWebMenuModel = PaginateModel<IWebMenu>;
