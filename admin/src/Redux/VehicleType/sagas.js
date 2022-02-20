import React from 'react';
import { FormattedMessage } from 'react-intl';
import { all, takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { toast } from '../../Lib/Toast';
import { VehicleTypeActions, VehicleTypeTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import ResourceActions from '../Resources/actions';

export let getVehicleTypes = handlePaginate('vehicleTypes', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    return yield call(api.getVehicleTypes, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...query,
      populates: ['category', 'services', ...(query.populates || [])]
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleTypeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(VehicleTypeActions.mergeResults(result));
    } else {
      yield put(VehicleTypeActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetVehicleTypesErrors(data));
    yield put(VehicleTypeActions.setResults([]));
  }
});

export function* getAllVehicleType(api, { opts = {} }) {
  const response = yield call(api.getVehicleTypes, {
    ...opts,
    populates: ['icon', 'activeIcon']
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleTypeSchema
    ]);
    yield put(VehicleTypeActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehicleTypesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getAllVehicleTypes(api, { query, refresh }) {
  const response = yield call(api.getAllVehicleTypes, query);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleTypeSchema
    ]);
    yield put(VehicleTypeActions.setAllResults(result));

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetRegionsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getVehicleTypeById(api, { id }) {
  const response = yield call(api.getVehicleTypeById, id, {
    populates: ['category', 'services']
  });
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.vehicleTypeSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehicleTypesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createVehicleType(
  api,
  { vehicleType, iconFiles, iconActiveFiles, iconSmallFiles }
) {
  const toastId = toast.info('Create vehicleType...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.VEHICLE_TYPE_CREATE));
  const response = yield call(
    api.createVehicleType,
    vehicleType,
    iconFiles,
    iconActiveFiles,
    iconSmallFiles,
    onUploadProgress
  );

  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    const { entities } = yield normalize([data], [Schemas.vehicleTypeSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(VehicleTypeActions.setCreated(data._id));
    yield put(VehicleTypeActions.setSelected(data._id));
    yield put(setSubmitSucceeded(Form.VEHICLE_TYPE_CREATE));
    yield put(stopSubmit(Form.VEHICLE_TYPE_CREATE));
  }
  function* onFailed(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_successfully" />,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.VEHICLE_TYPE_CREATE));
    yield put(
      stopSubmit(Form.VEHICLE_TYPE_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateVehicleType(
  api,
  { id, vehicleType, iconFiles, iconActiveFiles, iconSmallFiles }
) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.VEHICLE_TYPE_UPDATE));
  const response = yield call(
    api.updateVehicleType,
    id,
    vehicleType,
    iconFiles,
    iconActiveFiles,
    iconSmallFiles,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.VEHICLE_TYPE_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.VEHICLE_TYPE_UPDATE));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: `Upload failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.VEHICLE_TYPE_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeEvery(VehicleTypeTypes.GET_VEHICLE_TYPES, getVehicleTypes, api),
    takeLatest(VehicleTypeTypes.CREATE_VEHICLE_TYPE, createVehicleType, api),
    takeLatest(VehicleTypeTypes.UPDATE_VEHICLE_TYPE, updateVehicleType, api),
    takeLatest(
      VehicleTypeTypes.GET_VEHICLE_TYPE_BY_ID,
      getVehicleTypeById,
      api
    ),
    takeLatest(VehicleTypeTypes.GET_ALL_VEHICLE_TYPE, getAllVehicleType, api),
    takeEvery(VehicleTypeTypes.GET_ALL_VEHICLE_TYPES, getAllVehicleTypes, api)
  ]);
}
