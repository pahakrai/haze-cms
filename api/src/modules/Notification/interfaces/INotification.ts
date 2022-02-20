'use strict';

import {Document, PaginateModel} from 'mongoose';

export interface INotification extends Document {
  _id: string;
  users: Array<any>;
  nav: {
    type: string;
    _id: string;
  };
  message: {
    en: string;
    'zh-cn': string;
    'zh-hk': string;
  };
}
export type INotificationModel = PaginateModel<INotification>;
