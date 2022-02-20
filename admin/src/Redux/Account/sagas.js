import { all, takeLatest, call, put, putResolve } from 'redux-saga/effects';
import { reset as resetForm } from 'redux-form';
import { normalize } from 'normalizr';
import { AccountActions, AccountTypes } from './actions';
import { AppActions } from '../App/actions';
import { LoadingActions } from '../Loading/actions';
import { WebMenuActions } from '../WebMenu/actions';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';

import { entities as Schemas } from '../../Services/Schemas';
import { appWorkspace } from '../../Lib/util';

import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { getErrorFromResponse } from '../utils/saga';
import { handleResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { UserActions } from '../User/actions';

/**
 * Since login is required, it must be unauthenticated and without UserInfo (even if you have to, you must request it once)
 * @param {api} accountService
 * @param {action} action
 */
export function* login(accountService, action) {
  try {
    // Fetch fields from action
    const { email, password, userTypes, query } = action;

    // Start form submit
    yield put(startSubmit(Form.LOGIN));
    // Fetch token based on action username & password
    const userTokenResponse = yield call(
      accountService.token,
      email,
      password,
      userTypes,
      query
    );
    if (!userTokenResponse.ok) {
      yield put(
        stopSubmit(
          Form.LOGIN,
          getErrorFromResponse(Form.LOGIN, userTokenResponse)
        )
      );
      return;
    }
    const userToken = userTokenResponse.data;

    // set Token
    accountService.self.getTokenManager().setToken(userToken);
    yield put(AppActions.setToken(userToken.access_token));

    // login success , get webMenus
    // with token , get webMenus
    yield putResolve(WebMenuActions.getWebMenus());

    const currentUserResponse = yield call(accountService.getAccountUser);
    if (!currentUserResponse.ok) {
      yield put(
        stopSubmit(
          Form.LOGIN,
          getErrorFromResponse(Form.LOGIN, currentUserResponse)
        )
      );
      return;
    }
    const currentUser = currentUserResponse.data;

    // save resource
    const { entities } = yield normalize([currentUser], [Schemas.userSchema]);
    yield put(ResourceActions.addEntities(entities));
    // set current user id
    yield put(AppActions.setCurrentUserId(currentUser._id));
    yield put(setSubmitSucceeded(Form.LOGIN));
    yield put(stopSubmit(Form.LOGIN));

    // login success , get workspace
    // set workspace
    yield getAccountWorkspace(accountService, {});
  } catch (e) {
    yield put(
      stopSubmit(Form.LOGIN, getErrorFromResponse(Form.LOGIN, e.response))
    );
  }
}

/**
 * @param {api} accountService
 * @param {action} action
 */
export function* getOneTimePassword(accountService, action) {
  // Fetch fields from action
  const { email } = action;

  // Start form submit
  yield put(startSubmit(Form.LOGIN));
  // fetch get one time password
  let response = yield call(accountService.getOneTimePassword, email);
  if (!response.ok) {
    yield put(
      stopSubmit(Form.LOGIN, getErrorFromResponse(Form.LOGIN, response))
    );
    return;
  }
  yield put(setSubmitSucceeded(Form.LOGIN));
  yield put(stopSubmit(Form.LOGIN));
}

export function* logout(accountService, action) {
  const response = yield call(accountService.logout);
  if (!response.ok) {
    // report error here
  }
  accountService.self.getTokenManager().clearToken(); // clear token
  yield put(AccountActions.reset()); // reset account
  yield put(AppActions.reset()); // reset account
  yield put(AccountActions.getAccountWorkspace()); // reset workspace
  yield put(ResourceActions.reset()); // reset resource
  yield put(UserActions.setResults([])); // clear suer result
  yield put(WebMenuActions.getWebMenus()); // get not token webmenu
}

export function* verifyCode(accountService, { email, code }) {
  yield put(startSubmit(Form.VERIFY_CODE));
  const response = yield call(accountService.verifyCode, email, code);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.VERIFY_CODE));
    yield put(AccountActions.setVerifyCodeToken(data));
    yield put(stopSubmit(Form.VERIFY_CODE));
  }

  function* onFailed(data) {
    yield put(
      stopSubmit(
        Form.VERIFY_CODE,
        getErrorFromResponse(Form.VERIFY_CODE, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* resetPassword(accountService, { formBody, searchString }) {
  yield put(startSubmit(Form.RESET_PASSWORD));
  const response = yield call(
    accountService.resetPassword,
    formBody,
    searchString
  );
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.RESET_PASSWORD));
    yield put(stopSubmit(Form.RESET_PASSWORD));
  }

  function* onFailed(data) {
    yield put(
      stopSubmit(
        Form.RESET_PASSWORD,
        getErrorFromResponse(Form.RESET_PASSWORD, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* setPassword(accountService, { formBody, searchString }) {
  yield put(startSubmit(Form.RESET_PASSWORD));
  const response = yield call(
    accountService.setPassword,
    formBody,
    searchString
  );
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.RESET_PASSWORD));
    yield put(stopSubmit(Form.RESET_PASSWORD));
  }

  function* onFailed(data) {
    yield put(
      stopSubmit(
        Form.RESET_PASSWORD,
        getErrorFromResponse(Form.RESET_PASSWORD, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* changePassword(accountService, { formBody, userId }) {
  yield put(startSubmit(Form.CHANGE_PASSWORD));
  const response = yield call(accountService.changePassword, formBody, userId);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.CHANGE_PASSWORD));
    yield put(stopSubmit(Form.CHANGE_PASSWORD));
    yield put(resetForm(Form.CHANGE_PASSWORD));
  }

  function* onFailed(data) {
    yield put(
      stopSubmit(
        Form.CHANGE_PASSWORD,
        getErrorFromResponse(Form.CHANGE_PASSWORD, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* sendResetPasswordEmail(accountService, { email }) {
  const response = yield call(accountService.sendResetPasswordEmail, email);

  function* onSuccess(data) {}

  function onFailed(data) {
    console.error('send reset password email failed!');
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* sendConfirmUserEmail(accountService, { email, userType }) {
  const response = yield call(
    accountService.sendConfirmUserEmail,
    email,
    userType
  );

  function* onSuccess(data) {}

  function onFailed(data) {
    console.error('send reset password email failed!');
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* forgotPassword(accountService, { formBody }) {
  yield put(startSubmit(Form.FORGOT_PASSWORD));
  const response = yield call(accountService.forgotPassword, formBody);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.FORGOT_PASSWORD));
    yield put(stopSubmit(Form.FORGOT_PASSWORD));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.FORGOT_PASSWORD));
    yield put(
      stopSubmit(
        Form.FORGOT_PASSWORD,
        getErrorFromResponse(Form.FORGOT_PASSWORD, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

// Verify verification email token
export function* resendValidateUserNotification(accountService, { opts }) {
  const response = yield call(
    accountService.resendValidateUserNotification,
    opts
  );

  function onSuccess(data) {}

  function* onFailed(data) {
    // yield put(setSubmitFailed(Form.FORGOT_PASSWORD));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* setUser(accountService, { user }) {
  if (!user) return null;
  const { entities } = yield normalize([user], [Schemas.userSchema]);
  yield put(ResourceActions.addEntities(entities));
}
export function* getAccountWorkspace(
  accountService,
  { params = {}, config = {} }
) {
  const commonQuery = {
    populates: [
      '$setting.logo',
      '$setting.favicon',
      '$setting.headerLogo',
      '$setting.loginBackgroundImage'
    ]
  };

  let response = null;

  // get current workspace need token
  const currentToken = accountService.self.getTokenManager().getToken();
  // get custome workspace
  const customeWorkspaceId = appWorkspace;
  // by token time and token , currentUser is login in
  const logined = !!currentToken;
  if (!logined && !customeWorkspaceId) {
    return;
  }
  yield put(LoadingActions.setLoading('accountWorkspace', true));
  if (logined) {
    response = yield call(
      accountService.workspace,
      commonQuery,
      params,
      config
    );
  } else if (customeWorkspaceId) {
    response = yield call(
      accountService.getWorkspaceById,
      customeWorkspaceId,
      commonQuery
    );
  }
  function* onSuccess(data) {
    // save resource
    const { entities } = yield normalize(
      [response.data],
      [Schemas.workspaceSchema]
    );
    // set account user data
    yield put(ResourceActions.addEntities(entities));
    // set current user id

    yield put(AppActions.setCurrentWorkspaceId(data ? data._id : ''));
  }

  function* onFailed(data) {
    // set current user id
    yield put(AppActions.setCurrentWorkspaceId(null));
    // yield put(setSubmitFailed(Form.FORGOT_PASSWORD));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('accountWorkspace', false));
}
export function* changeAccountWorkspace(accountService, { workspaceId }) {
  const response = yield call(accountService.changeWorkspace, workspaceId);

  function* onSuccess(data) {
    // get current workspace
    yield put(AccountActions.getAccountWorkspace());
    // refresh location
    typeof window !== 'undefined' && window.location.reload();
  }

  function* onFailed(data) {
    yield put(ErrorActions.setChangeWorkspaceErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getAccountUser(accountService, { params = {}, config = {} }) {
  // get current workspace need token
  const currentToken = accountService.self.getTokenManager().getToken();
  // by token time and token , currentUser is login in
  const logined = !!currentToken;
  if (!logined) {
    return;
  }
  const response = yield call(accountService.getAccountUser, params, config);
  function* onSuccess(data) {
    // save resource
    const { entities } = yield normalize([response.data], [Schemas.userSchema]);
    // set account user data
    yield put(ResourceActions.addEntities(entities));
    // set current user id
    yield put(AppActions.setCurrentUserId(response.data && response.data._id));
  }

  function* onFailed(data) {
    // yield put(setSubmitFailed(Form.FORGOT_PASSWORD));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* signUp(accountService, { email }) {
  yield put(startSubmit(Form.SIGN_UP));
  const response = yield call(accountService.providerSignUp, email);
  function* onSuccess(data) {
    window.localStorage.setItem('signUpUser', email.email);
    yield put(setSubmitSucceeded(Form.SIGN_UP));
    yield put(stopSubmit(Form.SIGN_UP));
  }

  function* onFailed(data) {
    yield put(
      stopSubmit(Form.SIGN_UP, getErrorFromResponse(Form.SIGN_UP, response))
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* signUpConfirm(accountService, { token, formValues }) {
  yield put(startSubmit(Form.SIGN_UP_CONFIRM));
  const response = yield call(accountService.signUpConfirm, token, formValues);
  function* onSuccess(data) {
    const userTokenResponse = yield call(
      accountService.token,
      window.localStorage.getItem('signUpUser'),
      formValues.password,
      ['provider'],
      {
        rememberMe: true,
        headerWorkspace: data.workspace._id
      }
    );
    const userToken = userTokenResponse.data;
    accountService.self.getTokenManager().setToken(userToken);

    yield put(
      AccountActions.login(
        window.localStorage.getItem('signUpUser'),
        formValues.password,
        ['provider'],
        {
          rememberMe: true,
          headerWorkspace: data.workspace._id
        }
      )
    );
    yield put(AppActions.setToken(userToken));
    yield put(AccountActions.setLoginFromHeaderWorkspace(data.workspace._id));
    yield putResolve(WebMenuActions.getWebMenus());
    yield put(AppActions.setCurrentUserId(data.group.users[0]));
    yield put(setSubmitSucceeded(Form.SIGN_UP_CONFIRM));
    yield put(stopSubmit(Form.SIGN_UP_CONFIRM));
  }

  function* onFailed(data) {
    yield put(
      stopSubmit(
        Form.SIGN_UP_CONFIRM,
        getErrorFromResponse(Form.SIGN_UP_CONFIRM, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(accountService) {
  yield all([
    takeLatest(AccountTypes.GET_ACCOUNT_USER, getAccountUser, accountService),
    takeLatest(
      AccountTypes.GET_ACCOUNT_WORKSPACE,
      getAccountWorkspace,
      accountService
    ),
    takeLatest(
      AccountTypes.CHANGE_ACCOUNT_WORKSPACE,
      changeAccountWorkspace,
      accountService
    ),
    takeLatest(AccountTypes.SET_USER, setUser, accountService),
    takeLatest(
      AccountTypes.GET_ONE_TIME_PASSWORD,
      getOneTimePassword,
      accountService
    ),
    takeLatest(AccountTypes.LOGIN, login, accountService),
    takeLatest(AccountTypes.LOGOUT, logout, accountService),
    takeLatest(AccountTypes.VERIFY_CODE, verifyCode, accountService),
    takeLatest(AccountTypes.RESET_PASSWORD, resetPassword, accountService),
    takeLatest(AccountTypes.SET_PASSWORD, setPassword, accountService),
    takeLatest(
      AccountTypes.SEND_RESET_PASSWORD_EMAIL,
      sendResetPasswordEmail,
      accountService
    ),
    takeLatest(AccountTypes.FORGOT_PASSWORD, forgotPassword, accountService),
    takeLatest(
      AccountTypes.SEND_CONFIRM_USER_EMAIL,
      sendConfirmUserEmail,
      accountService
    ),
    takeLatest(AccountTypes.CHANGE_PASSWORD, changePassword, accountService),
    takeLatest(
      AccountTypes.RESEND_VALIDATE_USER_NOTIFICATION,
      resendValidateUserNotification,
      accountService
    ),
    takeLatest(AccountTypes.SIGN_UP, signUp, accountService),
    takeLatest(AccountTypes.SIGN_UP_CONFIRM, signUpConfirm, accountService)
  ]);
}
