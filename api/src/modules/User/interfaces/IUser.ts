import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

export interface IUserAvatar {
  fileMeta: ObjectId;
  default: boolean;
}

export interface IUserPreferenceTheme {
  theme: ObjectId;
  scope: string;
}

export interface IUserPreferences {
  language: string;
  receiveNotification: boolean;
  themes: IUserPreferenceTheme[];
  meta: any;
  subscriptionNotification: boolean;
}

export interface IUserActivationIssue {
  _id: ObjectId;
  reason: string;
  createdAt: Date;
  status: number;
}

export interface IUserVerified {
  phone: boolean;
  email: boolean;
}

export interface IUser extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;
  workspaces: string[];
  currentWorkspace?: ObjectId;
  phoneRegionCode: string;
  phone: string;
  email: string;
  // no duplicated username allowed for same workspace
  username: string;
  verified: IUserVerified | {};
  isVerified: boolean;
  status: number;
  userTypes: string[];
  // name can be duplicated for the same workspace
  name: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  description: string;
  avatars: IUserAvatar[];
  preferences: IUserPreferences;
  activationIssues: IUserActivationIssue[];

  // generated fields
  actions: {
    allows: string[];
    denies: string[];
  };
}

export type IUserModel = PaginateModel<IUser>;
