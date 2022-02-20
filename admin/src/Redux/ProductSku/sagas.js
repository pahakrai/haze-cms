import {
  all,
  put,
  takeLatest,
  call,
  select,
  takeEvery
} from 'redux-saga/effects';

import { ProductSkuTypes, ProductSkuActions } from './actions';
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
import { LoadingActions } from '../Loading/actions';
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getProductSkus = handlePaginate('productSkus', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getProductSkus,
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
    const { entities, result } = yield normalize(data, [
      Schemas.productSkuSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(ProductSkuActions.mergeResults(result));
    } else {
      yield put(ProductSkuActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetProductSkusErrors(data));
    yield put(ProductSkuActions.setResults([]));
  }
});

export function* getProductSkuById(api, { id }) {
  const response = yield call(api.getProductSkuById, id, {
    populates: ['$specs.spec']
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.productSkuSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetProductSkusErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createProductSku(api, { formValues }) {
  const formName = Form.PRODUCT_SKU_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createProductSku, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.productSkuSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ProductSkuActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateProductSku(api, { formValues }) {
  const formName = Form.PRODUCT_SKU_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateProductSku, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.productSkuSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* searchProductSkus(api, { q, query = {} }) {
  yield put(LoadingActions.setLoading('searchProductSkus', true));
  const response = yield call(api.getProductSkus, {
    q,
    offset: 0,
    limit: 10,
    paginate: true,
    ...query,
    populates: ['$specs.spec']
  });
  function* onSuccess(reqResult) {
    const data = (reqResult && reqResult.docs) || [];
    const { entities, result } = yield normalize(data, [
      Schemas.productSkuSchema
    ]);

    yield put(ResourceActions.addEntities(entities));
    yield put(ProductSkuActions.setSearchResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setsearchProductSkusErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('searchProductSkus', false));
}

export default function* roots(api) {
  yield all([
    takeEvery(ProductSkuTypes.SEARCH_PRODUCT_SKUS, searchProductSkus, api),
    takeLatest(ProductSkuTypes.GET_PRODUCT_SKUS, getProductSkus, api),
    takeLatest(ProductSkuTypes.GET_PRODUCT_SKU_BY_ID, getProductSkuById, api),
    takeLatest(ProductSkuTypes.UPDATE_PRODUCT_SKU, updateProductSku, api),
    takeLatest(ProductSkuTypes.CREATE_PRODUCT_SKU, createProductSku, api)
  ]);
}
