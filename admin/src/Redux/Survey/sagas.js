import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { SurveyTypes, SurveyActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getSurveies = handlePaginate('surveies', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getSurveies,
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
    const { entities, result } = yield normalize(data, [Schemas.surveySchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(SurveyActions.mergeResults(result));
    } else {
      yield put(SurveyActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetSurveiesErrors(data));
    yield put(SurveyActions.setResults([]));
  }
});

export function* getSurveyById(api, { id }) {
  const response = yield call(api.getSurveyById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.surveySchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetSurveiesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createSurvey(api, { formValues }) {
  const formName = Form.SURVEY_CREATE;
  yield put(startSubmit(formName));
  const state = yield select(state => state);
  const response = yield call(
    api.createSurvey,
    appendQueryWorkspace(state, {
      ...formValues
    })
  );
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.surveySchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(SurveyActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateSurvey(api, { formValues }) {
  const formName = Form.SURVEY_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateSurvey, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.surveySchema]);
    yield put(ResourceActions.addEntities(entities));
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
    takeLatest(SurveyTypes.GET_SURVEIES, getSurveies, api),
    takeLatest(SurveyTypes.GET_SURVEY_BY_ID, getSurveyById, api),
    takeLatest(SurveyTypes.UPDATE_SURVEY, updateSurvey, api),
    takeLatest(SurveyTypes.CREATE_SURVEY, createSurvey, api)
  ]);
}
