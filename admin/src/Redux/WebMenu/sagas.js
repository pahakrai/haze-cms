import { all, put, takeLatest, call } from 'redux-saga/effects';

import { WebMenuTypes, WebMenuActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import { handleResponse } from '../utils/saga';

export function* getWebMenus(api, { opts = { query: {} } }) {
  yield put(LoadingActions.setLoading('webMenus', true));
  const response = yield call(api.getWebMenus, opts.query);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(
      // why some time array
      Array.isArray(data) ? data : [data],
      [Schemas.webMenuSchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(WebMenuActions.setResults(result));
    yield put(LoadingActions.setLoading('webMenus', false));
  }

  function* onFailed(data) {
    yield put(WebMenuActions.setResults([]));
    yield put(LoadingActions.setLoading('webMenus', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([takeLatest(WebMenuTypes.GET_WEB_MENUS, getWebMenus, api)]);
}
