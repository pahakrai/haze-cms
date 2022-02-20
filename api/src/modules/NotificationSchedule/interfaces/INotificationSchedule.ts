'use strict';
import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {FileMeta} from 'src/modules/File/FileMeta';

export interface INotificationSchedule extends Document {
  _id: ObjectId;
  notification: {
    title: {
      en: string;
      'zh-cn': string;
      'zh-hk': string;
    };
    body: {
      en: string;
      'zh-cn': string;
      'zh-hk': string;
    };
    data: {
      screen: string;
      parameters: any;
    };
    images: Array<FileMeta> | Array<FileMeta['_id']>;
    notificationMediaType: string;
  };
  startTime: Date;
  reoccurance: {
    everyType?: string;
    everyN?: number;
    weeklyDays?: number[];
    monthlyDate?: number;
    yearlyDate?: Date;
    endTime?: Date;
  };
  to: {
    groups: string[];
    filters: any;
    users: string[];
  };
  jobId: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export type INotificationScheduleModel = PaginateModel<INotificationSchedule>;
