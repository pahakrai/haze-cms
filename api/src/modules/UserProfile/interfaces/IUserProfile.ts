import {Member} from 'src/modules/Member/interfaces';
import {IUser} from 'src/modules/User';

export interface IUserProfile {
  user: IUser;
  member: Member;
  balance: any;
}
