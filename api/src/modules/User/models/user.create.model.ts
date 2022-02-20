import {ObjectId} from 'mongodb';
import {UserActivationIssueCreateModel} from './user.activationIssue.create.model';

export class UserAvatarCreateModel {
  fileMeta: ObjectId;
  default?: boolean;
}

export class UserPreferenceCreateModel {
  language?: string;
  receiveNotification?: boolean;
  subscriptionNotification?: boolean;
}

export class UserVerifiedCreateModel {
  phone?: boolean;
  email?: boolean;
}

export class UserCreateModel {
  workspaces?: string[];

  currentWorkspace?: string;

  phoneRegionCode?: string;

  phone?: string;

  email?: string;

  username?: string;

  verified?: UserVerifiedCreateModel;

  isVerified?: boolean;

  userTypes?: string[];

  dob?: string;

  gender?: string;

  name?: string;

  firstName?: string;

  lastName?: string;

  avatars?: UserAvatarCreateModel[];

  preferences?: UserPreferenceCreateModel;

  status?: number;

  description?: string;

  activationIssues?: UserActivationIssueCreateModel;
}
