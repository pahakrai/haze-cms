import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {File} from 'src/core/interfaces';
import {IUser} from 'src/modules/User';
import {Address} from 'src/modules/Address/interfaces';
import {UserLevel} from 'src/modules/UserLevel/interfaces';
import {MemberPreferences} from './member.preference.interface';

export interface Member extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * document id referencing to user
   */
  user: IUser | IUser['_id'];

  files: Array<File>;

  meta: JSON;

  preferences: MemberPreferences;

  organizationName: string;

  locations: Address[];

  level: UserLevel | UserLevel['_id'];

  /**
   * member's average score
   */
  avgFeedback: number;

  // generated by mongoose
  /**
   * create time of this document
   */
  createdAt: Date;

  /**
   * update time of this document
   */
  updatedAt: Date;
}

export type MemberModel = PaginateModel<Member>;
