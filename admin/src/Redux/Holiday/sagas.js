import React from 'react';
import { FormattedMessage } from 'react-intl';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { HolidayTypes, HolidayActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { toast } from '../../Lib/Toast';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import { getErrorFromResponse } from '../utils/saga';
// import { LoadingActions } from '../Loading/actions';
// import { handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import Form from '../../Constants/Form';

export function* getHolidays(api) {
  const state = yield select(state => state);
  const response = yield call(api.getHolidays, appendQueryWorkspace(state, {}));
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.holidaySchema]);
    yield put(HolidayActions.setResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetFileMetasErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createHoliday(api, { formValues }) {
  const state = yield select(state => state);
  const response = yield call(
    api.createHoliday,
    appendQueryWorkspace(state, {
      ...formValues
    })
  );
  yield put(startSubmit(Form.HOLIDAY_CREATE));
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.HOLIDAY_CREATE));
    const { entities } = yield normalize([data], [Schemas.holidaySchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.HOLIDAY_CREATE));
    yield put(HolidayActions.getHolidays());
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.HOLIDAY_CREATE));
    yield put(
      stopSubmit(Form.HOLIDAY_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateHoliday(api, { formValues }) {
  const { id, value } = formValues;
  yield put(startSubmit(Form.HOLIDAY_UPDATE));
  const state = yield select(state => state);
  const response = yield call(
    api.updateHoliday,
    appendQueryWorkspace(state, { id, value })
  );
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.HOLIDAY_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.HOLIDAY_UPDATE));
    yield put(HolidayActions.getHolidays());
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.HOLIDAY_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deleteHoliday(api, { id }) {
  yield LoadingActions.setLoading('deleteHoliday', true);
  const response = yield call(api.deleteHoliday, id);
  function* onSuccess() {
    const results = yield select(state => state.holiday.results);

    yield put(HolidayActions.setResults(results.filter(v => v !== id)));
    toast.error(<FormattedMessage id="msg.delete_successful" />);
  }

  function onFailed(data) {
    toast.error(data.message);
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield LoadingActions.setLoading('deleteHoliday', false);
}

export default function* roots(api) {
  yield all([takeLatest(HolidayTypes.GET_HOLIDAYS, getHolidays, api)]);
  yield all([takeLatest(HolidayTypes.CREATE_HOLIDAY, createHoliday, api)]);
  yield all([takeLatest(HolidayTypes.UPDATE_HOLIDAY, updateHoliday, api)]);
  yield all([takeLatest(HolidayTypes.DELETE_HOLIDAY, deleteHoliday, api)]);
}
