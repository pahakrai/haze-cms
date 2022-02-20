import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

const ContactMethodDetail = {
  // contact method, ie. sms, email
  transportType: {type: String, required: true},
  // interact link url. Can have placeholders
  // for example: ${HOST_ADMIN}/verify-user
  // where ${HOST_ADMIN} will be fetched from env
  interactLinkUrl: {type: String},
  // how user will follow up on process
  // the value here is default interactType value ie. code/link
  // can be overwritten from the frontend also
  // as web and mobile might have different requirements
  // that affect the message currently email only
  interactType: {type: String},
  // optional override length
  passcodeLength: {type: Number},
  // optional expires in for passcode
  passcodeExpiresIn: {type: Number},
  // passcode scope name
  passcodeScope: {type: String},
  // extra parameters to add onto the email
  // default to empty object as may send unnecessary params
  // for localization as all the params fallback to default
  // settings but dont want to transportParameters to fallback to default
  // making transportParameters more strict
  transportParameters: {type: SchemaTypes.Mixed, default: {}},
  // base email title
  emailMessage: {
    default: {type: LocalizeStringSchema, required: true, default: ''},
    link: {type: LocalizeStringSchema},
    passcode: {type: LocalizeStringSchema}
  },
  // email template for if transportType is email
  emailTemplate: {type: String},
  // base email title
  emailTitle: {type: LocalizeStringSchema},
  // sms message
  smsMessage: {type: LocalizeStringSchema},
  // whether user's verified statuses should be updated
  // if the passcode is valid
  isUpdateUserVerifyOnPasscodeValidate: {type: Boolean}
};

export const CollectionName = 'AuthConfigs';
export const Schema = new MongooseSchema(
  {
    activateByAdmin: {type: Boolean},
    contactMethod: {
      default: ContactMethodDetail,
      emailVerify: ContactMethodDetail,
      forgotPassword: ContactMethodDetail,
      phoneVerify: ContactMethodDetail,
      signUp: ContactMethodDetail,
      userIsVerifiedTrue: ContactMethodDetail,
      userStatusActive: ContactMethodDetail,
      invite: ContactMethodDetail
    },
    loginRequireVerify: {type: Boolean},
    signUpAcGroups: [{type: String}],
    signUpRequireVerify: {type: Boolean},
    userType: {type: String, required: true},
    verifiedRequirements: [{type: String, required: true}],
    workspace: {type: SchemaTypes.ObjectId, required: true, ref: 'Workspaces'}
  },
  {
    minimize: false,
    collection: CollectionName,
    timestamps: true
  }
);
