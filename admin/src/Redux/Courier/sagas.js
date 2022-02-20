import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { CourierTypes, CourierActions } from './actions';
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

export let getCouriers = handlePaginate('couriers', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getCouriers,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts.query
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.courierSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(CourierActions.mergeResults(result));
    } else {
      yield put(CourierActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetCouriersErrors(data));
    yield put(CourierActions.setResults([]));
  }
});

export function* getCourierById(api, { id }) {
  const response = yield call(api.getCourierById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.courierSchema
    );
    yield put(ResourceActions.addEntities(entities));
    // yield put(CourierActions.setEditForm(data));
    // yield put(CourierActions.setSelected(data._id));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCouriersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createCourier(api, { formValues }) {
  const formName = Form.COURIER_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createCourier, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.courierSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(CourierActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateCourier(api, { formValues }) {
  const formName = Form.COURIER_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateCourier, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.courierSchema]);
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
    takeLatest(CourierTypes.GET_COURIERS, getCouriers, api),
    takeLatest(CourierTypes.GET_COURIER_BY_ID, getCourierById, api),
    takeLatest(CourierTypes.UPDATE_COURIER, updateCourier, api),
    takeLatest(CourierTypes.CREATE_COURIER, createCourier, api)
  ]);
}
