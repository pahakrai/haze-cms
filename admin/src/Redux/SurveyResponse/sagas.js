import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { SurveyResponseTypes, SurveyResponseActions } from './actions';
import ResourceActions from '../Resources/actions';
import { ErrorActions } from '../Error/actions';
import { entities as Schemas } from '../../Services/Schemas';
import { handleResponse } from '../utils/saga';
import { handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getSurveyResponses = handlePaginate('surveyResponses', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    if (!query.user) query.user = undefined;
    return yield call(
      api.getSurveyResponses,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: [...(query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.surveyResponseSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(SurveyResponseActions.mergeResults(result));
    } else {
      yield put(SurveyResponseActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetSurveyResponsesErrors(data));
    yield put(SurveyResponseActions.setResults([]));
  }
});

export function* getSurveyResponseById(api, { id, opts }) {
  const response = yield call(api.getSurveyResponseById, id, { ...opts });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.surveyResponseSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetSurveyResponseErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(
      SurveyResponseTypes.GET_SURVEY_RESPONSES,
      getSurveyResponses,
      api
    ),
    takeLatest(
      SurveyResponseTypes.GET_SURVEY_RESPONSE_BY_ID,
      getSurveyResponseById,
      api
    )
  ]);
}
