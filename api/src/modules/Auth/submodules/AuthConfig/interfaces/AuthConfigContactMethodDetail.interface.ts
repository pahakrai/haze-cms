import {LocalizeString} from 'src/core';

export interface AuthConfigContactMethodDetail {
  transportType: string;
  interactLinkUrl: string;
  interactType: string;
  passcodeLength?: number;
  passcodeExpiresIn?: number;
  // base email title
  emailMessage: {
    default: LocalizeString;
    link: LocalizeString;
    passcode: LocalizeString;
  };
  // email template for if transportType is email
  emailTemplate: string;
  // base email title
  emailTitle: LocalizeString;
  // sms message
  smsMessage: LocalizeString;
  isUpdateUserVerifyOnPasscodeValidate: boolean;
  passcodeScope?: string;
}
