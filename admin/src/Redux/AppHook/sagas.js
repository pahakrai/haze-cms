import { all, put, takeLatest, call } from 'redux-saga/effects';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';

import { handleResponse } from '../utils/saga';

import ResourceActions from '../Resources/actions';
import { ErrorActions } from '../Error/actions';
import { AppHookActions, AppHookTypes } from './actions';

export function* getAppHookByName(api, { name }) {
  const response = yield call(api.getAppHookByName, name);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.appHookSchema);

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetAppHookErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getAllAppHook(api) {
  const response = yield call(api.getAllAppHook);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.appHookSchema]);
    yield put(AppHookActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetAppHookErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getAllAppHookName(api, { opts = {} }) {
  const response = yield call(api.getAllAppHookName);
  function* onSuccess(data) {
    yield put(AppHookActions.setNameResults(data));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetAppHookErrors(data));
    yield put(AppHookActions.setNameResults([]));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(AppHookTypes.GET_APP_HOOK_BY_NAME, getAppHookByName, api),
    takeLatest(AppHookTypes.GET_ALL_APP_HOOK, getAllAppHook, api),
    takeLatest(AppHookTypes.GET_ALL_APP_HOOK_NAME, getAllAppHookName, api)
  ]);
}
