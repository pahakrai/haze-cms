import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Product} from '../../../interfaces';
import {IProductSpec} from '../../ProductSpec/interfaces';
import {FileMeta} from 'src/modules/File/FileMeta';

export interface IProductSku extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;
  product: Product | Product['_id'];
  image: FileMeta | FileMeta['_id'];
  specs: SkuSpec[];
  code: string;
  currency: string;
  amount: number;
  discountAmount: number;
  discountType: string;
  idx: number;
  qty: number;
  maxAllow: number;
  validateInventory: boolean;
  expiryDate: Date;
}

export interface SkuSpec {
  spec: IProductSpec | IProductSpec['_id'];
  value: string;
}

export type IProductSkuModel = PaginateModel<IProductSku>;
