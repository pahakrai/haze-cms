import {UserNotificationToUserCreateModel} from './userNotification.toUser.create.model';

class UserNotificationImage {
  fileMeta: string;
}

export class UserNotificationCreateModel {
  _id?: string;
  senders: string[];
  users?: UserNotificationToUserCreateModel[];
  devices?: string[];
  // nav: {
  //   type: string;
  //   item: string;
  // };
  title: {
    [lang: string]: string;
  };
  message: {
    [lang: string]: string;
  };
  images: Array<UserNotificationImage>;
}
