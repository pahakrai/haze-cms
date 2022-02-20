import { gql } from "@apollo/client";

export const MUTATION_USER_TOKEN = (fields = ``) => gql`
  mutation UserToken($input: String!, $password: String!, $userTypes: [String!]!, $workspace: ID) {
    userToken(input: $input, password: $password, userTypes: $userTypes,workspace: $workspace) {
      ${fields}
    }
  }
`;

export const MUTATION_CURRENT_USER = (fields = CURRENT_USER_FIELDS) => gql`
  mutation CurrentUser {
    currentUser {
      _id
      ${fields}
    }
  }
`;

export const TOKEN_FIELDS = `
  userId
  token_type
  expires_in
  expires_on
  access_token
  refresh_token
`;

export const QUERY_CURRENT_USER = (fields = ``) => gql`
  query CurrentUser{
    currentUser{
      _id
      ${fields}
    }
  }
`;

export const CURRENT_USER_FIELDS = `
  _id
  avatars {
    _id
    fileMeta {
      _id
      uri
    }
    default
  }
  name
  phone
  phoneRegionCode
  status
  email
  firstName
  lastName
  username
  userTypes
  isVerified
  dob
  gender
  verified {
    phone
    email
  }
  preferences{
    subscriptionNotification
  }
`;

export const USER_TOKEN_FIELDS = `
  user {
    ${CURRENT_USER_FIELDS}
  }
  userToken {
    ${TOKEN_FIELDS}
  }
`;

export const MUTATION_FORGOT_PASSWORD = () => gql`
  mutation forgotPassword($input: String!) {
    forgotPassword(input: $input)
  }
`;

export const MUTATION_UPDATE_PASSWORD = () => gql`
  mutation updateMyPassword($newPassword: String!, $oldPassword: String!) {
    updateMyPassword(newPassword: $newPassword, oldPassword: $oldPassword)
  }
`;

export const SIGN_UP_MEMBER = (fields = SIGN_UP_MEMBER_FIELDS) => gql`
  mutation signUpMember($signupModel: MemberSignUpModel!,$registrationFiles: [Upload],$filesInfo: [FileInfo]) {
    signUpMember(
      signupModel: $signupModel,
      registrationFiles: $registrationFiles,
      filesInfo: $filesInfo
    ) {
      ${fields}
    }
  }
`;
export const SIGN_UP_MEMBER_FIELDS = `
  user{
    _id
  }
  member{
    _id
  }
`;

export const SIGN_UP_MERCHANT = (fields = SIGN_UP_MERCHANT_FIELDS) => gql`
  mutation signUpMerchant($signupModel: MerchantSignUpModel!,$registrationDocs: [Upload!]!) {
    signUpMerchant(
      signupModel: $signupModel,
      registrationDocs: $registrationDocs
    ) {
      ${fields}
    }
  }
`;

export const MUTATION_LOGIN_FACEBOOK = (fields = USER_TOKEN_FIELDS) => gql`
  mutation loginFacebook($token: String!,$newUser: SignupModel) {
    loginFacebook(
      token: $token,
      newUser: $newUser
    ) {
      ${fields}
    }
  }
`;

export const MUTATION_LOGIN_GOOGLE = (fields = USER_TOKEN_FIELDS) => gql`
  mutation loginGoogle($token: String!,$newUser: SignupModel) {
    loginGoogle(
      token: $token,
      newUser: $newUser
    ) {
      ${fields}
    }
  }
`;

export const MUTATION_VALIDATE_PASSCODE_TOKEN = () => gql`
  mutation validatePasscodeToken(
    $token: String!
    $options: ValidatePasscodeOptions
  ) {
    validatePasscodeToken(token: $token, options: $options) {
      token
      expiresIn
      expiresAt
    }
  }
`;

export const MUTATION_SEND_PASSCODE = () => gql`
  mutation sendPasscode($input: String, $options: SendPasscodeOptions) {
    sendPasscode(input: $input, options: $options)
  }
`;
export const MUTATION_RESET_PASSWORD = () => gql`
  mutation resetPassword($passcodeToken: String!, $password: String!) {
    resetPassword(passcodeToken: $passcodeToken, password: $password)
  }
`;
export const SIGN_UP_MERCHANT_FIELDS = `
  user{
    _id
  }
`;
