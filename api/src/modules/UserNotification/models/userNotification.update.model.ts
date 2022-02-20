export class UserNotificationUpdateModel {
  _id?: string;
  users: Array<any>;
  // nav: {
  //   type: string;
  //   item: string;
  // };
  message: {
    en: string;
    'zh-cn': string;
    'zh-hk': string;
  };
}
