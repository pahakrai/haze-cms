import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { MerchantTypes, MerchantActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { LoadingActions } from '../Loading/actions';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getMerchants = handlePaginate('merchants', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getMerchants,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        populates: ['user'],
        sort: '-createdAt',
        ...opts.query
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.merchantSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(MerchantActions.mergeResults(result));
    } else {
      yield put(MerchantActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetMerchantsErrors(data));
    yield put(MerchantActions.setResults([]));
  }
});

export function* getMerchantById(api, { id }) {
  const response = yield call(api.getMerchantById, id);
  function* onSuccess(data) {
    if (!data) {
      return;
    }
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.merchantSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetMerchantsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createMerchant(api, { formValues }) {
  const formName = Form.MERCHANT_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createMerchant, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.merchantSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(MerchantActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateMerchant(api, { formValues }) {
  const formName = Form.MERCHANT_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateMerchant, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.merchantSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* searchMerchants(api, { q, query }) {
  yield put(LoadingActions.setLoading('searchMerchants', true));
  const response = yield call(api.searchMerchants, { populates: ['user'] });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.merchantSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(MerchantActions.setSearchResults(result));
    yield put(MerchantActions.mergeAllResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setSearchUsersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('searchUsers', true));
}

export default function* roots(api) {
  yield all([
    takeLatest(MerchantTypes.GET_MERCHANTS, getMerchants, api),
    takeLatest(MerchantTypes.GET_MERCHANT_BY_ID, getMerchantById, api),
    takeLatest(MerchantTypes.UPDATE_MERCHANT, updateMerchant, api),
    takeLatest(MerchantTypes.CREATE_MERCHANT, createMerchant, api),
    takeLatest(MerchantTypes.SEARCH_MERCHANTS, searchMerchants, api)
  ]);
}
