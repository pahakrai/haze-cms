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

import { PriceActions, PriceTypes } from './actions';

export let getPrices = handlePaginate('Price', {
  call: function* (api, { opts = { filterValues: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const filterValues = opts && opts.filterValues ? opts.filterValues : {};
    return yield call(api.getPrices, {
      q: opts.searchTerm || '',
      offset,
      limit,
      localize: true,
      paginate: true,
      sort: '-createdAt',
      ...filterValues,
      page: filterValues.page || 1
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.priceSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PriceActions.mergeResults(result));
    } else {
      yield put(PriceActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPricesErrors(data));
  }
});

export function* getAllPrice(api, { opts }) {
  const response = yield call(api.getPrices, opts);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.priceSchema]);
    yield put(PriceActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPricesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getPriceById(api, { id }) {
  const response = yield call(api.getPriceById, id);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.priceSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPricesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPrice(api, { Price, files }) {
  const toastId = toast.info('Create workspace...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.PRICE_CREATE));
  const response = yield call(api.createPrice, Price, files, onUploadProgress);

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
    yield put(PriceActions.setCreated(data._id));
    yield put(PriceActions.setSelected(data._id));
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

export function* updatePrice(api, { id, Price, files }) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.PRICE_UPDATE));
  const response = yield call(
    api.updatePrice,
    id,
    Price,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.PRICE_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.PRICE_UPDATE));
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
  yield all([
    takeLatest(PriceTypes.CREATE_PRICE, createPrice, api),
    takeLatest(PriceTypes.UPDATE_PRICE, updatePrice, api),
    takeLatest(PriceTypes.GET_PRICE_BY_ID, getPriceById, api),
    takeLatest(PriceTypes.GET_PRICES, getPrices, api),
    takeLatest(PriceTypes.GET_ALL_PRICE, getAllPrice, api)
  ]);
}
