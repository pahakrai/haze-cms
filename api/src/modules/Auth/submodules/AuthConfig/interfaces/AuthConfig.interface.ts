import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {LocalizeStringModel} from 'src/core';
import {AuthConfigContactMethod} from './AuthConfigContactMethod.interface';

export interface AuthConfig extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  activateByAdmin: boolean;

  contactMethod: AuthConfigContactMethod;

  loginRequireVerify: boolean;

  // extra parameters to add onto the email
  transportParameters: {[key: string]: any};
  // base email title
  emailMessage: {
    default: LocalizeStringModel;
    link: LocalizeStringModel;
    passcode: LocalizeStringModel;
  };
  // email template for if transportType is email
  emailTemplate: string;
  // base email title
  emailTitle: LocalizeStringModel;
  // sms message
  smsMessage: LocalizeStringModel;

  signUpAcGroups: string[];

  signUpRequireVerify: boolean;

  userType: string;

  workspace: string;

  verifiedRequirements: string[];

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

export type AuthConfigModel = PaginateModel<AuthConfig>;
