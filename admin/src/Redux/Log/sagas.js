import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { entities as Schemas } from '../../Services/Schemas';
import { ErrorActions } from '../Error/actions';
import { LogActions, LogTypes } from './actions';
import ResourceActions from '../Resources/actions';

import { handleResponse, handlePaginate } from '../utils/saga';
export let getLogs = handlePaginate('logs', {
  call: function* (api, { opts: { filterValue } }, paginate) {
    const filter = yield select(state => state.filter.log);
    const { offset = 0, limit } = paginate;
    return yield call(api.getLogs, {
      searchTerm: filter.searchTerm,
      offset,
      limit,
      sort: '-createdAt',
      paginate: true,
      ...filterValue
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.logSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(LogActions.mergeResults(result));
    } else {
      yield put(LogActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetLogsErrors(data));
  }
});

export function* getLogById(api, { id }) {
  const response = yield call(api.getLogById, id);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.logSchema);
    yield put(ResourceActions.addEntities(entities));

    yield put(LogActions.setEditForm(data));
    yield put(LogActions.setSelected(data._id));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetLogsrrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([takeLatest(LogTypes.GET_LOGS, getLogs, api)]);
  yield all([takeLatest(LogTypes.GET_LOG_BY_ID, getLogById, api)]);
}
