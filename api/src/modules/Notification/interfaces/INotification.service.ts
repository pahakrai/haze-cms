'use strict';
import {NotificationCreateModel} from '../models';
export interface INotificationService {
  push(
    notifications: NotificationCreateModel,
    activeNotifications: any,
    lang: string
  ): Promise<void>;
  generateUserNotification(notifications: NotificationCreateModel);
  generatePushNotification(notifications: NotificationCreateModel, lang: any);
}
