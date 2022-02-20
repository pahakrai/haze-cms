interface IAvatar {
  _id: string;
  fileMeta: IFileMeta;
  default: boolean;
}
interface IUser {
  _id: string;
  phoneRegionCode: string;
  phone: string;
  phoneVerified: boolean;
  email: string;
  emailVerified: boolean;
  username: string;
  userTypes: string[];
  name: string;
  firstName: string;
  lastName: string;
  description: string;
  dob: string;
  gender: string;
  // groups: [Group];
  // loginChannel: [LoginChannel];
  avatars: IAvatar[];
  preferences?: IUserPreference;
  status: number;
  // verifyToken: VerifyToken;
  // actions: UserActions;
  // activationIssues: [ActivationIssue];
  isVerified: boolean;
  verified?: { [key: string]: boolean };
}
interface IUserPreference {
  subscriptionNotification?: boolean;
}
interface IUserFile {
  fileType: string;
  file: IFileMeta;
  isVerified: boolean;
}
interface IUploadUserFile {
  fileType: string;
  file: string;
  isVerified: boolean;
}
interface IUploadMember {
  _id: string;
  user?: string;
  files?: IUploadUserFile[];
  meta: ?object;
}
interface IUploadMerchant {
  _id: string;
  user?: string;
  files?: IUploadUserFile[];
  meta: ?object;
}
interface IMember {
  _id: string;
  user?: string;
  files?: IUserFile[];
  meta: ?object;
  level?: IUserLevel;
  age?: Int;
}

interface IMerchant {
  _id: string;
  user?: string;
  files?: IUserFile[];
  meta: ?object;
  level: IUserLevel;
}

interface IBalance {
  cash: numner;
  point: numner;
}

interface IUserProfile {
  user: IUser;
  merchant?: IMerchant;
  member?: IMember;
  balance?: IBalance;
}

interface IUserLevel {
  _id: !ID;
  name: string;
  workspace: IWorkspace;
  userType: String;
  isActive: !Boolean;
}

interface IUserProfileUpdateModel {
  user?: IUserUpdateModel;
  vehicle?: any;
  merchant?: any;
  member?: any;
}
interface IUserUpdateModel {
  name?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  email?: string;
  description?: string;
  phoneRegionCode?: string;
  phone?: string;
  preferences?: IUserPreferenceCreateModel;
}
interface IUserPreferenceCreateModel {
  language?: boolean;
  receiveNotification?: boolean;
  subscriptionNotification?: boolean;
}
