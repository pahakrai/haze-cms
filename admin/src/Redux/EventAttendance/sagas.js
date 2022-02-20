import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { EventAttendanceTypes, EventAttendanceActions } from './actions';
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
import { LoadingActions } from '../Loading/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getEventAttendances = handlePaginate('eventAttendances', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getEventAttendances,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.eventAttendanceSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(EventAttendanceActions.mergeResults(result));
    } else {
      yield put(EventAttendanceActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetEventAttendancesErrors(data));
    yield put(EventAttendanceActions.setResults([]));
  }
});

export function* getAllEventAttendance(api, { opts = {} }) {
  yield put(LoadingActions.setLoading('getAllEventAttendance', true));
  const response = yield call(api.getEventAttendances, {
    populates: ['user', 'event', 'eventCampaign', 'eventCampaign.product'],
    ...opts
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.eventAttendanceSchema
    ]);
    yield put(EventAttendanceActions.setAllResult(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetEventAttendancesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getAllEventAttendance', false));
}

export function* getEventAttendanceById(api, { id }) {
  const response = yield call(api.getEventAttendanceById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.eventAttendanceSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetEventAttendancesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getEventAttendanceByEventId(api, { id }) {
  const response = yield call(api.getEventAttendanceByEventId, id, {
    populates: ['user']
  });
  function* onSuccess(data) {
    yield put(EventAttendanceActions.setEventSnapshot(data));
  }
  function* onFailed(data) {
    yield put(ErrorActions.setGetEventAttendancesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createEventAttendance(api, { formValues }) {
  const formName = Form.EVENT_ATTENDANCE_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createEventAttendance, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize(
      [data],
      [Schemas.eventAttendanceSchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(EventAttendanceActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateEventAttendance(api, { formValues }) {
  const formName = Form.EVENT_ATTENDANCE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateEventAttendance, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize(
      [data],
      [Schemas.eventAttendanceSchema]
    );
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
    takeLatest(
      EventAttendanceTypes.GET_EVENT_ATTENDANCES,
      getEventAttendances,
      api
    ),
    takeLatest(
      EventAttendanceTypes.GET_EVENT_ATTENDANCE_BY_ID,
      getEventAttendanceById,
      api
    ),
    takeLatest(
      EventAttendanceTypes.UPDATE_EVENT_ATTENDANCE,
      updateEventAttendance,
      api
    ),
    takeLatest(
      EventAttendanceTypes.CREATE_EVENT_ATTENDANCE,
      createEventAttendance,
      api
    ),
    takeLatest(
      EventAttendanceTypes.GET_EVENT_ATTENDANCE_BY_EVENT_ID,
      getEventAttendanceByEventId,
      api
    ),
    takeLatest(
      EventAttendanceTypes.GET_ALL_EVENT_ATTENDANCE,
      getAllEventAttendance,
      api
    )
  ]);
}
