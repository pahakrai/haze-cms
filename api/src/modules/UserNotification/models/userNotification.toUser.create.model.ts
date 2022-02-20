import {IUser} from 'src/modules/User';

export class UserNotificationToUserCreateModel {
  user?: IUser | string;
  read?: boolean;
  email?: string;
  phone?: string;
  phoneRegionCode?: string;
  language?: string;
}
