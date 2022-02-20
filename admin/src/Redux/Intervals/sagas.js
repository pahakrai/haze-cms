import { all, put, takeLatest, call } from 'redux-saga/effects';
import { IntervalsTypes, IntervalsActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { handlePaginate } from '../utils/saga';

export let getIntervals = handlePaginate('intervals', {
  call: function* (api, { opts = { filterValues: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    return yield call(api.getIntervals, {
      bookTypes: opts.bookTypes || undefined,
      isHoliday: opts.isHoliday || undefined,
      offset,
      limit,
      localize: true,
      paginate: true,
      sort: '-createdAt',
      ...opts.filterValues,
      page: opts.filterValues ? opts.filterValues.page : 1
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.intervalsSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(IntervalsActions.mergeResults(result));
    } else {
      yield put(IntervalsActions.setAllResults(result));
      yield put(IntervalsActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetTunnelsErrors(data));
  }
});

export function* getIntervalsById(api, { id, query = {} }) {
  const response = yield call(api.getintervalsById, id, {
    ...query,
    populates: []
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.intervalsSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetintervalssErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(IntervalsTypes.GET_INTERVALS, getIntervals, api),
    takeLatest(IntervalsTypes.GET_INTERVALS_BY_ID, getIntervalsById, api)
  ]);
}
