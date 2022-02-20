// import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  all,
  takeLatest,
  call,
  put,
  select,
  takeLeading
} from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { StoreActions, StoreTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';

import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { appendQueryWorkspace } from '../utils';

export let getStores = handlePaginate('stores', {
  call: function* (api, { opts = { query: {}, page: 1 } }, paginate) {
    let { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getStores,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page,
        populates: ['address', ...(query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.storeSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(StoreActions.mergeResults(result));
    } else {
      yield put(StoreActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetStoresErrors(data));
  }
});

export function* getStoreById(api, { id, query = {} }) {
  const response = yield call(api.getStoreById, id, {
    ...query,
    populates: ['address', ...(query.populates || [])]
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.storeSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetStoreErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createStore(api, { formValues }) {
  yield put(StoreActions.setSelected(''));
  const formName = Form.STORE_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createStore, formValues);
  function* onSuccess(data) {
    yield put(StoreActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateStore(api, { formValues }) {
  const formName = Form.STORE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateStore, formValues);
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
    takeLeading(StoreTypes.GET_STORES, getStores, api),
    takeLatest(StoreTypes.GET_STORE_BY_ID, getStoreById, api),
    takeLatest(StoreTypes.CREATE_STORE, createStore, api),
    takeLatest(StoreTypes.UPDATE_STORE, updateStore, api)
  ]);
}
