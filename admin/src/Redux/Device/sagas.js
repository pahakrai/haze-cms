import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';

import Form from '../../Constants/Form';
import { handleResponse, handlePaginate } from '../utils/saga';
import { getErrorFromResponse } from '../utils/saga';
import ResourceActions from '../Resources/actions';
import { ErrorActions } from '../Error/actions';
import { DeviceTypes, DeviceActions } from './actions';
import { appendQueryWorkspace } from '../utils';

export function* getAllDevice(api, { opts = { query: {}, refresh: true } }) {
  const response = yield call(api.getDevices, {
    ...opts.query
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.deviceSchema]);
    if (opts.refresh) {
      yield put(DeviceActions.setAllResults(result));
    } else {
      yield put(DeviceActions.mergeAllResults(result));
    }

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetDevicesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export let getDevices = handlePaginate('devices', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getDevices,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-lastOnTime',
        ...query,
        populates: [...(query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.deviceSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(DeviceActions.mergeResults(result));
    } else {
      yield put(DeviceActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetDevicesErrors(data));
    yield put(DeviceActions.setResults([]));
  }
});

export function* updateDevice(api, { formValues }) {
  const formName = Form.VEHICLE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateDevice, formValues);
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
  yield all([takeLatest(DeviceTypes.GET_DEVICES, getDevices, api)]);
  yield all([takeLatest(DeviceTypes.GET_ALL_DEVICE, getAllDevice, api)]);
  yield all([takeLatest(DeviceTypes.UPDATE_DEVICE, updateDevice, api)]);
}
