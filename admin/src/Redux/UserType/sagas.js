import { all, takeEvery, call, put } from 'redux-saga/effects';

import { UserTypeActions, UserTypeTypes } from './actions';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import { LoadingActions } from '../Loading/actions';

export function* getUserTypes(api, { opts = {} }) {
  yield put(LoadingActions.setLoading('getUserTypes', true));
  const response = yield call(api.getUserTypes);
  function* onSuccess(data) {
    yield put(UserTypeActions.setResults(data));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceUserTypeErrors(data));
    yield put(UserTypeActions.setResults([]));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getUserTypes', false));
}

export default function* roots(api) {
  yield all([takeEvery(UserTypeTypes.GET_USER_TYPES, getUserTypes, api)]);
}
