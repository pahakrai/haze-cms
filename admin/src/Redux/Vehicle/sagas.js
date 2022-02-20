import {
  all,
  takeLatest,
  takeEvery,
  call,
  select,
  put,
  takeLeading
} from 'redux-saga/effects';
import React from 'react';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { toast } from '../../Lib/Toast';
import { VehicleActions, VehicleTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import { LoadingActions } from '../Loading/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import ResourceActions from '../Resources/actions';
import { browserHistory } from '../../Redux';
import { appendQueryWorkspace } from '../utils';

export let searchSelectVehicles = handlePaginate('searchSelectVehicles', {
  call: function* (api, { q, opts }, paginate) {
    const { offset = 0, limit } = paginate;
    return yield call(api.getVehicles, {
      q: q || '',
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...(opts.query || {})
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.vehicleSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(VehicleActions.setSearchSelectResults(result));
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetVehiclesErrors(data));
    yield put(VehicleActions.setSearchSelectResults([]));
  }
});

export function* getVehiclesWithAll(api, { opts = {} }) {
  const {
    onSuccess: onSuccessCall,
    onFailed: onFailedCall,
    filterValues = {}
  } = opts;
  const state = yield select(state => state);
  const response = yield call(
    api.getVehicles,
    appendQueryWorkspace(state, {
      sort: '-createdAt',
      ...filterValues
    })
  );
  function* onSuccess(data) {
    if (onSuccessCall) onSuccessCall(data);
    const { entities, result } = yield normalize(data, [Schemas.vehicleSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(VehicleActions.setResults(result));
  }

  function* onFailed(data) {
    if (onFailedCall) onFailedCall(data);
    yield put(ErrorActions.setGetVehiclesErrors(data));
    yield put(VehicleActions.setResults([]));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export let getVehicles = handlePaginate('vehicles', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    return yield call(api.getVehicles, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...(opts.query || {}),
      populates: [
        'type',
        'make',
        'capabilities',
        'driver',
        ...(query.populates || [])
      ]
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.vehicleSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(VehicleActions.mergeResults(result));
    } else {
      yield put(VehicleActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetVehiclesErrors(data));
    yield put(VehicleActions.setResults([]));
  }
});

function* clearVehicleById(id) {
  const { entities } = yield normalize([{ id: null }], Schemas.vehicleSchema);
  yield put(ResourceActions.addEntities(entities));
}

export function* getVehicleById(api, { id, opts }) {
  yield put(LoadingActions.setLoading('getVehicleById', true));
  yield clearVehicleById(id);
  const response = yield call(api.findVehicleById, id, {
    ...opts,
    populates: [
      '$services.service',
      'type.services',
      'type.services.$conditions.key',
      'type.services.uom'
    ]
  });
  function* onSuccess(data) {
    if (!data || typeof data !== 'object') {
      yield onFailed();
      return;
    }
    const { entities } = yield normalize(data, Schemas.vehicleSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehiclesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getVehicleById', false));
}

export function* createVehicle(api, JobService, { opts, jobId }) {
  yield put(startSubmit(Form.VEHICLE_CREATE));
  let response = null;

  if (opts.from === 'job' && jobId) {
    response = yield call(JobService.createVehicleByJob, jobId, opts);
  } else {
    response = yield call(api.createVehicle, opts);
  }

  function* onSuccess(data) {
    // const { entities } = yield normalize(data, Schemas.vehicleSchema);
    // yield put(ResourceActions.addEntities(entities));
    yield put(setSubmitSucceeded(Form.VEHICLE_CREATE));
    yield put(stopSubmit(Form.VEHICLE_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.VEHICLE_CREATE));
    yield put(
      stopSubmit(Form.VEHICLE_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateVehicle(api, { opts }) {
  yield put(startSubmit(Form.VEHICLE_UPDATE));
  const response = yield call(api.updateVehicle, opts);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.VEHICLE_UPDATE));
    const { entities } = yield normalize([data], [Schemas.vehicleSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.VEHICLE_UPDATE));
  }
  function* onFailed(data) {
    yield put(
      stopSubmit(Form.VEHICLE_UPDATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}
export function* deleteVehicle(api, { id, pageType }) {
  const response = yield call(api.deleteVehicle, id);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="msg.delete_successful" />);
    if (pageType === 'form') {
      yield put(VehicleActions.getVehicles({ refresh: true }));
      yield put(VehicleActions.setSelected(''));
      browserHistory.push('/vehicles');
    }
  }
  function onFailed(data) {
    toast.error(<FormattedMessage id="msg.delete_fail" />);
  }

  yield handleResponse(response)(onSuccess, onFailed);
}
export function* updateVehiclePreference(api, { id, services }) {
  yield put(LoadingActions.setLoading('updateVehiclePreference', true));
  const response = yield call(api.updateVehiclePreference, id, { services });
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="updated_successfully" />);
    yield put(VehicleActions.getVehicleById(data._id));
  }
  function onFailed(data) {
    toast.error(<FormattedMessage id="updated_failure" />);
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('updateVehiclePreference', false));
}

export default function* roots(api, JobService) {
  yield all([
    takeEvery(VehicleTypes.GET_VEHICLES, getVehicles, api),
    takeEvery(VehicleTypes.GET_VEHICLES_WITH_ALL, getVehiclesWithAll, api),
    takeLatest(VehicleTypes.CREATE_VEHICLE, createVehicle, api, JobService),
    takeLatest(VehicleTypes.UPDATE_VEHICLE, updateVehicle, api),
    takeLatest(VehicleTypes.GET_VEHICLE_BY_ID, getVehicleById, api),
    takeLatest(VehicleTypes.DELETE_VEHICLE, deleteVehicle, api),
    takeEvery(VehicleTypes.SEARCH_SELECT_VEHICLES, searchSelectVehicles, api),
    takeLeading(
      VehicleTypes.UPDATE_VEHICLE_PREFERENCE,
      updateVehiclePreference,
      api
    )
  ]);
}
