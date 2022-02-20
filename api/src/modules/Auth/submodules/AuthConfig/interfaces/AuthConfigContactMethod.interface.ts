import {AuthConfigContactMethodDetail} from './AuthConfigContactMethodDetail.interface';

export interface AuthConfigContactMethod {
  default: AuthConfigContactMethodDetail;
  phoneVerify: AuthConfigContactMethodDetail;
  emailVerify: AuthConfigContactMethodDetail;
  forgotPassword: AuthConfigContactMethodDetail;
  signUp: AuthConfigContactMethodDetail;
  userIsVerifiedTrue: AuthConfigContactMethodDetail;
  userStatusActive: AuthConfigContactMethodDetail;
  invite: AuthConfigContactMethodDetail;
}
