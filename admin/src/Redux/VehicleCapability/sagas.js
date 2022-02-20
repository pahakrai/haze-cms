import { all, takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { VehicleCapabilityActions, VehicleCapabilityTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import ResourceActions from '../Resources/actions';

export let getVehicleCapabilities = handlePaginate('vehicleCapabilities', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    return yield call(api.getVehicleCapabilities, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...opts.query
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleCapabilitySchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(VehicleCapabilityActions.mergeResults(result));
    } else {
      yield put(VehicleCapabilityActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetVehicleCapabilitiesErrors(data));
    yield put(VehicleCapabilityActions.setResults([]));
  }
});

export function* getVehicleCapabilityById(api, { id }) {
  const response = yield call(api.getVehicleCapabilityById, id);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.vehicleCapabilitySchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehicleCapabilitiesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getAllVehicleCapability(api, { opts }) {
  const response = yield call(api.getVehicleCapabilities, opts);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleCapabilitySchema
    ]);

    yield put(VehicleCapabilityActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehicleCapabilitiesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createVehicleCapability(api, JobService, { opts, jobId }) {
  yield put(startSubmit(Form.VEHICLE_CAPABILITY_CREATE));
  let response = null;

  if (opts.from === 'job' && jobId) {
    response = yield call(JobService.createVehicleCapabilityByJob, jobId, opts);
  } else {
    response = yield call(api.createVehicleCapability, opts);
  }

  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.VEHICLE_CAPABILITY_CREATE));
    const { entities } = yield normalize(data, [
      Schemas.vehicleCapabilitySchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.VEHICLE_CAPABILITY_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.VEHICLE_CAPABILITY_CREATE));
    yield put(
      stopSubmit(
        Form.VEHICLE_CAPABILITY_CREATE,
        getErrorFromResponse(null, data)
      )
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateVehicleCapability(api, { id, opts }) {
  yield put(startSubmit(Form.VEHICLE_CAPABILITY_UPDATE));
  const response = yield call(api.updateVehicleCapability, id, opts);
  function* onSuccess(data) {
    const { entities } = yield normalize(
      [data],
      [Schemas.vehicleCapabilitySchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(setSubmitSucceeded(Form.VEHICLE_CAPABILITY_UPDATE));
    yield put(stopSubmit(Form.VEHICLE_CAPABILITY_UPDATE));
  }
  function* onFailed(data) {
    yield put(
      stopSubmit(
        Form.VEHICLE_CAPABILITY_UPDATE,
        getErrorFromResponse(null, data)
      )
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api, JobService) {
  yield all([
    takeEvery(
      VehicleCapabilityTypes.GET_VEHICLE_CAPABILITIES,
      getVehicleCapabilities,
      api
    ),
    takeLatest(
      VehicleCapabilityTypes.CREATE_VEHICLE_CAPABILITY,
      createVehicleCapability,
      api,
      JobService
    ),
    takeLatest(
      VehicleCapabilityTypes.UPDATE_VEHICLE_CAPABILITY,
      updateVehicleCapability,
      api
    ),
    takeLatest(
      VehicleCapabilityTypes.GET_VEHICLE_CAPABILITY_BY_ID,
      getVehicleCapabilityById,
      api
    ),
    takeLatest(
      VehicleCapabilityTypes.GET_ALL_VEHICLE_CAPABILITY,
      getAllVehicleCapability,
      api
    )
  ]);
}
