// import React from 'react';
import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
// import { toast } from '../../Lib/Toast';
// import { FormattedMessage } from 'react-intl';
import { ProductTypeActions, ProductTypeTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';

import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { appendQueryWorkspace } from '../utils';

export let getProductTypes = handlePaginate('productTypes', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    let { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    const state = yield select(state => state);
    return yield call(
      api.getProductTypes,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: [...(query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.productTypeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(ProductTypeActions.mergeResults(result));
    } else {
      yield put(ProductTypeActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetProductTypesErrors(data));
  }
});

export function* getProductTypeById(api, { id, query = {} }) {
  const response = yield call(api.getProductTypeById, id, {
    ...query,
    populates: [...(query.populates || [])]
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.productTypeSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetProductTypeErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getAllProductTypes(api, { query }) {
  const response = yield call(api.getProductTypes, {
    ...query,
    populates: []
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.productTypeSchema
    ]);
    yield put(ProductTypeActions.setAllResults(result));

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetProductTypesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createProductType(api, { formValues }) {
  yield put(ProductTypeActions.setSelected(''));
  const formName = Form.PRODUCT_TYPE_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createProductType, formValues);
  function* onSuccess(data) {
    yield put(ProductTypeActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateProductType(api, { formValues }) {
  const formName = Form.PRODUCT_TYPE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateProductType, formValues);
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
  yield all([
    takeLatest(ProductTypeTypes.GET_PRODUCT_TYPES, getProductTypes, api),
    takeLatest(ProductTypeTypes.GET_ALL_PRODUCT_TYPES, getAllProductTypes, api),
    takeLatest(
      ProductTypeTypes.GET_PRODUCT_TYPE_BY_ID,
      getProductTypeById,
      api
    ),
    takeLatest(ProductTypeTypes.CREATE_PRODUCT_TYPE, createProductType, api),
    takeLatest(ProductTypeTypes.UPDATE_PRODUCT_TYPE, updateProductType, api)
  ]);
}
