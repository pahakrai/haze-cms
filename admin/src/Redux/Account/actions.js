import { createActions } from 'reduxsauce';

export const { Types: AccountTypes, Creators: AccountActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getOneTimePassword: ['email'],
    login: ['email', 'password', 'userTypes', 'query'],
    logout: null,
    getAccountUser: ['params', 'config'],
    getAccountWorkspace: ['params', 'config'],
    changeAccountWorkspace: ['workspaceId'],
    setUser: ['user'],
    verifyCode: ['email', 'code'],
    resetPassword: ['formBody', 'searchString'],
    setPassword: ['formBody', 'searchString'],
    forgotPassword: ['formBody'],
    sendResetPasswordEmail: ['email'],
    sendConfirmUserEmail: ['email', 'userType'],
    changePassword: ['formBody', 'userId'],
    resendValidateUserNotification: ['opts'],
    signUp: ['email'],
    signUpConfirm: ['token', 'formValues'],

    /* ------------- Reducers ------------- */
    setLoginFromMode: ['mode'],
    setLoginFromHeaderWorkspace: ['workspace'],
    // setUser: ['user'],
    setVerifyCodeToken: ['token'],
    // setValidateToken: ['validateToken'],

    reset: null
  },
  { prefix: 'Account/' }
);
