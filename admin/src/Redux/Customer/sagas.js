import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { CustomerTypes, CustomerActions } from './actions';
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
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getCustomers = handlePaginate('customers', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getCustomers,
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
      Schemas.customerSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(CustomerActions.mergeResults(result));
    } else {
      yield put(CustomerActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetCustomersErrors(data));
    yield put(CustomerActions.setResults([]));
  }
});

export function* getCustomersWithAll(api, { opts = {} }) {
  const { onSuccess: onSuccessCall, onFailed: onFailedCall, query } = opts;
  const state = yield select(state => state);
  const response = yield call(
    api.getCustomers,
    appendQueryWorkspace(state, {
      sort: '-createdAt',
      ...query
    })
  );
  function* onSuccess(data) {
    if (onSuccessCall) onSuccessCall(data);
    const { entities, result } = yield normalize(data, [
      Schemas.customerSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(CustomerActions.setResults(result));
  }

  function* onFailed(data) {
    if (onFailedCall) yield onFailedCall(data);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getCustomerById(api, { id }) {
  const response = yield call(api.getCustomerById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.customerSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCustomersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createCustomer(api, { formValues }) {
  const formName = Form.CUSTOMER_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createCustomer, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.customerSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(CustomerActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateCustomer(api, { formValues }) {
  const formName = Form.CUSTOMER_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateCustomer, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.customerSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* searchCustomers(api, { opts }) {
  const state = yield select(state => state);
  const response = yield call(
    api.getCustomers,
    appendQueryWorkspace(state, {
      ...opts
    })
  );
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.customerSchema
    ]);
    yield put(CustomerActions.setSearchResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCustomersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(CustomerTypes.GET_CUSTOMERS, getCustomers, api),
    takeLatest(CustomerTypes.GET_CUSTOMERS_WITH_ALL, getCustomersWithAll, api),
    takeLatest(CustomerTypes.GET_CUSTOMER_BY_ID, getCustomerById, api),
    takeLatest(CustomerTypes.UPDATE_CUSTOMER, updateCustomer, api),
    takeLatest(CustomerTypes.CREATE_CUSTOMER, createCustomer, api),
    takeLatest(CustomerTypes.SEARCH_CUSTOMERS, searchCustomers, api)
  ]);
}
