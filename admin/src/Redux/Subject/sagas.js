import { all, put, takeLatest, call } from 'redux-saga/effects';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';

import Form from '../../Constants/Form';
import { handleResponse } from '../utils/saga';
import { getErrorFromResponse } from '../utils/saga';

import ResourceActions from '../Resources/actions';
import { ErrorActions } from '../Error/actions';
import { SubjectTypes, SubjectActions } from './actions';

export function* getAllSubject(api, { opts = { query: {}, refresh: true } }) {
  const response = yield call(api.getSubjects, {
    ...opts.query
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.subjectSchema]);
    if (opts.refresh) {
      yield put(SubjectActions.setAllResults(result));
    } else {
      yield put(SubjectActions.mergeAllResults(result));
    }

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetSubjectsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateSubject(api, { formValues }) {
  const formName = Form.VEHICLE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateSubject, formValues);
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
  yield all([takeLatest(SubjectTypes.GET_ALL_SUBJECT, getAllSubject, api)]);
  yield all([takeLatest(SubjectTypes.UPDATE_SUBJECT, updateSubject, api)]);
}
