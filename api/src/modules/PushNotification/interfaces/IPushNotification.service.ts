'use strict';
import {IPushNotification} from '.';
import {PushNotification} from './PushNotification.interface';
import {
  PushNotificationCreateModel,
  PushNotificationDelateModel,
  PushNotificationSearchModel,
  PushNotificationsSearchModel,
  PushNotificationUpdateModel
} from '../models';
export interface IPushNotificationService {
  create(
    pushNotificationCreateModel: PushNotificationCreateModel
  ): Promise<PushNotification>;
  sendNotification(
    pushNotificationCreateModel: PushNotificationCreateModel,
    retryCount: number
  ): Promise<any>;
  delete(
    pushNotificationDelateModel: PushNotificationDelateModel
  ): Promise<void>;
  putJob(data: any, url: string, delay): Promise<void>;
  update(
    _id: string,
    pushNotificationUpdateModel: PushNotificationUpdateModel,
    req: any
  ): Promise<IPushNotification>;
  find(pushNotificationSearchModel: PushNotificationSearchModel);
  findAll(pushNotificationsSearchModel: PushNotificationsSearchModel);
  doJobAfterPushNotification(pushNotification: any);
  resendNotification(
    resendUsers: Array<any>,
    resendDevices: Array<any>,
    pushNotification
  );
}
