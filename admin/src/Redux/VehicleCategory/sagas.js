import { all, takeLatest, call, put } from 'redux-saga/effects';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { toast } from '../../Lib/Toast';

import { entities as Schemas } from '../../Services/Schemas';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';

import { VehicleCategoryActions, VehicleCategoryTypes } from './actions';

export let getVehicleCategories = handlePaginate('vehicleCategories', {
  call: function* (
    api,
    { opts: filterValues = { filterValues: {} } },
    paginate
  ) {
    const { offset = 0, limit } = paginate;
    return yield call(api.getVehicleCategories, {
      searchTerm: filterValues.searchTerm || '',
      offset,
      limit,
      localize: true,
      paginate: true,
      sort: '-createdAt',
      ...filterValues.filterValues
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.vehicleCategorySchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(VehicleCategoryActions.mergeResults(result));
    } else {
      yield put(VehicleCategoryActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetVehicleCategoriesErrors(data));
  }
});

export function* getVehicleCategoryById(api, { id }) {
  const response = yield call(api.getVehicleCategoryById, id);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.vehicleCategorySchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetVehicleCategoriesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createVehicleCategory(api, { vehicleCategory, files }) {
  const toastId = toast.info('Create workspace...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.VEHICLE_CATEGORY_CREATE));
  const response = yield call(
    api.createVehicleCategory,
    vehicleCategory,
    files,
    onUploadProgress
  );

  function* onSuccess(data) {
    toast.update(toastId, {
      render: 'Create VehicleCategory Successfully',
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    const { entities } = yield normalize(
      [data],
      [Schemas.vehicleCategorySchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(VehicleCategoryActions.setCreated(data._id));
    yield put(VehicleCategoryActions.setSelected(data._id));
    yield put(setSubmitSucceeded(Form.VEHICLE_CATEGORY_CREATE));
    // yield put(stopSubmit(Form.VEHICLE_CATEGORY_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.VEHICLE_CATEGORY_CREATE));
    yield put(
      stopSubmit(Form.VEHICLE_CATEGORY_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateVehicleCategory(api, { id, vehicleCategory, files }) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.VEHICLE_CATEGORY_UPDATE));
  const response = yield call(
    api.updateVehicleCategory,
    id,
    vehicleCategory,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.VEHICLE_CATEGORY_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.VEHICLE_CATEGORY_UPDATE));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: `Upload failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.WORKSPACE_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  // yield all([
  //   takeLatest(
  //     VehicleCategoryTypes.GET_VEHICLE_CATEGORIES,
  //     getVehicleCategories,
  //     api
  //   )
  // ]);
  yield all([
    takeLatest(
      VehicleCategoryTypes.CREATE_VEHICLE_CATEGORY,
      createVehicleCategory,
      api
    )
  ]);
  yield all([
    takeLatest(
      VehicleCategoryTypes.UPDATE_VEHICLE_CATEGORY,
      updateVehicleCategory,
      api
    )
  ]);
}
