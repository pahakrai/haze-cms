import { all, takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { VehicleModelActions, VehicleModelTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import ResourceActions from '../Resources/actions';

export let getVehicleModels = handlePaginate('vehicleModels', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    return yield call(api.getVehicleModels, {
      searchTerm: '',
      offset,
      limit,
      ...query,
      page: query.page || 1,
      paginate: true,
      sort: '-createdAt',
      ...opts.query,
      populates: ['type', 'make', ...(query.populates || [])]
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleModelSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(VehicleModelActions.mergeResults(result));
    } else {
      yield put(VehicleModelActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetVehicleModelsErrors(data));
    yield put(VehicleModelActions.setResults([]));
  }
});

export function* getAllVehicleModel(api, { opts }) {
  yield put(VehicleModelActions.setAllResults([]));
  const response = yield call(api.getVehicleModels, opts);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleModelSchema
    ]);
    yield put(VehicleModelActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehicleModelsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getVehicleModelById(api, { id, query }) {
  const response = yield call(api.getVehicleModelById, id, query);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.vehicleModelSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehicleModelsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createVehicleModel(api, { opts, jobId }) {
  yield put(startSubmit(Form.VEHICLE_MODEL_CREATE));
  let response = null;

  response = yield call(api.createVehicleModel, opts);

  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.VEHICLE_MODEL_CREATE));
    const { entities } = yield normalize(data, [Schemas.vehicleModelSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.VEHICLE_MODEL_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.VEHICLE_MODEL_CREATE));
    yield put(
      stopSubmit(Form.VEHICLE_MODEL_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateVehicleModel(api, { id, opts }) {
  yield put(startSubmit(Form.VEHICLE_MODEL_UPDATE));
  const response = yield call(api.updateVehicleModel, id, opts);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.VEHICLE_MODEL_UPDATE));
    const { entities } = yield normalize([data], [Schemas.vehicleModelSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.VEHICLE_MODEL_UPDATE));
  }
  function* onFailed(data) {
    yield put(
      stopSubmit(Form.VEHICLE_MODEL_UPDATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeEvery(VehicleModelTypes.GET_VEHICLE_MODELS, getVehicleModels, api),
    takeLatest(VehicleModelTypes.CREATE_VEHICLE_MODEL, createVehicleModel, api),
    takeLatest(VehicleModelTypes.UPDATE_VEHICLE_MODEL, updateVehicleModel, api),
    takeLatest(
      VehicleModelTypes.GET_VEHICLE_MODEL_BY_ID,
      getVehicleModelById,
      api
    ),
    takeLatest(VehicleModelTypes.GET_ALL_VEHICLE_MODEL, getAllVehicleModel, api)
  ]);
}
