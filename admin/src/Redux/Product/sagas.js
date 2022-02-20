import React from 'react';
import {
  all,
  put,
  takeEvery,
  call,
  select,
  takeLatest,
  takeLeading
} from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { FormattedMessage } from 'react-intl';

import { toast } from '../../Lib/Toast';
import { entities as Schemas } from '../../Services/Schemas';
import Form from '../../Constants/Form';

import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';

import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

import { ProductTypes, ProductActions } from './actions';

export let getProducts = handlePaginate('products', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getProducts,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: ['category', 'specs', 'skus', ...(query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.productSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(ProductActions.mergeResults(result));
    } else {
      yield put(ProductActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetProductsErrors(data));
    yield put(ProductActions.setResults([]));
  }
});

export function* getProductById(api, { id }) {
  yield put(ErrorActions.setGetProductErrors(null));
  const state = yield select(state => state);
  const response = yield call(
    api.getProductById,
    id,
    appendQueryWorkspace(state, {
      populates: ['specs', 'skus', 'category', 'images']
    })
  );
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.productSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetProductErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createProduct(
  api,
  { formValues, files, skuFiles, mediaList1, mediaList2, mediaList3 }
) {
  const toastId = toast.info(
    <span>
      <FormattedMessage id="uploading" />
      ...0%
    </span>,
    { autoClose: false }
  );
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: (
        <span>
          <FormattedMessage id="uploading" />
          ...{progress.toFixed(2)}%
        </span>
      )
    });
  };
  const formName = Form.PRODUCT_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(
    api.createProduct,
    formValues,
    files,
    skuFiles,
    mediaList1,
    mediaList2,
    mediaList3,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.productSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ProductActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_failure" />,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateProduct(
  api,
  { formValues, files, skuFiles, mediaList1, mediaList2, mediaList3 }
) {
  const toastId = toast.info(
    <span>
      <FormattedMessage id="uploading" />
      ...0%
    </span>,
    { autoClose: false }
  );
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: (
        <span>
          <FormattedMessage id="uploading" />
          ...{progress.toFixed(2)}%
        </span>
      )
    });
  };
  const formName = Form.PRODUCT_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(
    api.updateProduct,
    formValues.product._id,
    formValues,
    files,
    skuFiles,
    mediaList1,
    mediaList2,
    mediaList3,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.productSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_failure" />,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* searchProducts(api, { q, query = {} }) {
  yield put(LoadingActions.setLoading('searchProducts', true));
  const response = yield call(api.getProducts, {
    q,
    populates: ['specs', 'skus', 'category'],
    offset: 0,
    limit: 10,
    paginate: true,
    ...query
  });
  function* onSuccess(reqResult) {
    const data = (reqResult && reqResult.docs) || [];
    const { entities, result } = yield normalize(data, [Schemas.productSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ProductActions.setSearchResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setsearchProductsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('searchProducts', false));
}

export function* importProduct(api, { files }) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  const formName = Form.IMPORT_PRODUCT;
  const response = yield call(api.importProduct, files, onUploadProgress);
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(ProductActions.setImported(true));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_failure" />,
      // render: `Upload failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(formName));
    yield put(ErrorActions.setImportProductErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeEvery(ProductTypes.SEARCH_PRODUCTS, searchProducts, api),
    takeLatest(ProductTypes.GET_PRODUCTS, getProducts, api),
    takeLatest(ProductTypes.GET_PRODUCT_BY_ID, getProductById, api),
    takeLeading(ProductTypes.UPDATE_PRODUCT, updateProduct, api),
    takeLeading(ProductTypes.CREATE_PRODUCT, createProduct, api),
    takeLatest(ProductTypes.IMPORT_PRODUCT, importProduct, api)
  ]);
}
