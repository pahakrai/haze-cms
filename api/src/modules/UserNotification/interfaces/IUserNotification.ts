import {Document, PaginateModel} from 'mongoose';
import {ObjectId} from 'mongodb';

export interface IUserNotification extends Document {
  _id: ObjectId;
  senders: Array<any>;
  users: Array<any>;
  title: {
    en: string;
    'zh-cn': string;
    'zh-hk': string;
  };
  // nav: {
  //   type: string;
  //   _id: string;
  // };
  message: {
    en: string;
    'zh-cn': string;
    'zh-hk': string;
  };
  imaages: Array<{fileMeta: string}>;
  data: any;
  message_display?: string;
  read?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type IUserNotificationModel = PaginateModel<IUserNotification>;
