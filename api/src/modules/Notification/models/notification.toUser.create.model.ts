import {IUser} from 'src/modules/User';

export class NotificationToUserCreateModel {
  user?: IUser;
  read?: boolean;
  email?: string;
  phone?: string;
  phoneRegionCode?: string;
  language?: string;
}
