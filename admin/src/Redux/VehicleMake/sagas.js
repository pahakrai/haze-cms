import { all, takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { VehicleMakeActions, VehicleMakeTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import ResourceActions from '../Resources/actions';

export let getVehicleMakes = handlePaginate('vehicleMakes', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    return yield call(api.getVehicleMakes, {
      searchTerm: opts.searchTerm || '',
      offset,
      limit,
      ...query,
      paginate: true,
      sort: '-createdAt',
      populates: []
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleMakeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(VehicleMakeActions.mergeResults(result));
    } else {
      yield put(VehicleMakeActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetVehicleMakesErrors(data));
    yield put(VehicleMakeActions.setResults([]));
  }
});
export function* getAllVehicleMake(api, { opts }) {
  const response = yield call(api.getVehicleMakes, opts);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleMakeSchema
    ]);
    yield put(VehicleMakeActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehicleMakesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getVehicleMakeById(api, { id }) {
  const response = yield call(api.getVehicleMakeById, id);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.vehicleMakeSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehicleMakesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createVehicleMake(api, JobService, { opts, jobId }) {
  yield put(startSubmit(Form.VEHICLE_MAKE_CREATE));
  let response = null;

  if (opts.from === 'job' && jobId) {
    response = yield call(JobService.createVehicleMakeByJob, jobId, opts);
  } else {
    response = yield call(api.createVehicleMake, opts);
  }

  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.VEHICLE_MAKE_CREATE));
    const { entities } = yield normalize(data, [Schemas.vehicleMakeSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.VEHICLE_MAKE_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.VEHICLE_MAKE_CREATE));
    yield put(
      stopSubmit(Form.VEHICLE_MAKE_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateVehicleMake(api, { id, opts }) {
  yield put(startSubmit(Form.VEHICLE_MAKE_UPDATE));
  const response = yield call(api.updateVehicleMake, id, opts);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.VEHICLE_MAKE_UPDATE));
    const { entities } = yield normalize([data], [Schemas.vehicleMakeSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.VEHICLE_MAKE_UPDATE));
  }
  function* onFailed(data) {
    yield put(
      stopSubmit(Form.VEHICLE_MAKE_UPDATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api, JobService) {
  yield all([
    takeEvery(VehicleMakeTypes.GET_VEHICLE_MAKES, getVehicleMakes, api),
    takeLatest(
      VehicleMakeTypes.CREATE_VEHICLE_MAKE,
      createVehicleMake,
      api,
      JobService
    ),
    takeLatest(VehicleMakeTypes.GET_ALL_VEHICLE_MAKE, getAllVehicleMake, api),
    takeLatest(VehicleMakeTypes.UPDATE_VEHICLE_MAKE, updateVehicleMake, api),
    takeLatest(VehicleMakeTypes.GET_VEHICLE_MAKE_BY_ID, getVehicleMakeById, api)
  ]);
}
