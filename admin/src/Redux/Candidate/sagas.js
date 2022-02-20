import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';

import { LoadingActions } from '../Loading/actions';
import Form from '../../Constants/Form';
import { handleResponse, handlePaginate } from '../utils/saga';
import { getErrorFromResponse } from '../utils/saga';

import ResourceActions from '../Resources/actions';
import { ErrorActions } from '../Error/actions';
import { CandidateTypes, CandidateActions } from './actions';
import { appendQueryWorkspace } from '../utils';

export let getCandidates = handlePaginate('candidates', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    yield put(LoadingActions.setLoading('getCandidates', true));
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};

    return yield call(
      api.getCandidates,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1
        // populates: ['candidate', 'recruitment']
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.candidateSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(CandidateActions.mergeResults(result));
    } else {
      yield put(CandidateActions.setResults(result));
    }
    yield put(LoadingActions.setLoading('getCandidates', false));
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetCandidatesErrors(data));
    yield put(CandidateActions.setResults([]));
    yield put(LoadingActions.setLoading('getCandidates', false));
  }
});

export function* getAllCandidate(api, { opts = { query: {}, refresh: true } }) {
  const response = yield call(api.getCandidates, {
    ...opts.query
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.candidateSchema
    ]);
    if (opts.refresh) {
      yield put(CandidateActions.setAllResults(result));
    } else {
      yield put(CandidateActions.mergeAllResults(result));
    }

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCandidatesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateCandidate(api, { formValues }) {
  const formName = Form.VEHICLE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateCandidate, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(CandidateTypes.GET_ALL_CANDIDATE, getAllCandidate, api)
  ]);
  yield all([takeLatest(CandidateTypes.GET_CANDIDATES, getCandidates, api)]);
  yield all([
    takeLatest(CandidateTypes.UPDATE_CANDIDATE, updateCandidate, api)
  ]);
}
