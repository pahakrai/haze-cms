import { all, takeEvery, call, put } from 'redux-saga/effects';
import { ServiceTypeActions, ServiceTypeTypes } from './actions';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';

export function* getServiceTypesByWorkspaceType(api, { opts = {} }) {
  const response = yield call(api.getServiceTypesByWorkspaceType);
  function* onSuccess(data) {
    yield put(ServiceTypeActions.setResults(data));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceServiceTypeErrors(data));
    yield put(ServiceTypeActions.setResults([]));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeEvery(
      ServiceTypeTypes.GET_SERVICE_TYPES_BY_WORKSPACE_TYPE,
      getServiceTypesByWorkspaceType,
      api
    )
  ]);
}
