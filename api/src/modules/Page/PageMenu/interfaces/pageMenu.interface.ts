'use strict';
import {PaginateModel, Document} from 'mongoose';

export interface PageMenuItem {
  name: {
    [key: string]: string;
  };
  type: number;
  data: any;
  to: string;
  idx: number;
  items: Array<PageMenuItem>;
  mItems: Array<PageMenuItem>;
}

export interface IPageMenu extends Document {
  _id: string;
  code: string;
  platform: string;
  items: Array<PageMenuItem>;
  mItems: Array<PageMenuItem>;
  // workspace: string;
}

export type IPageMenuModel = PaginateModel<IPageMenu>;
