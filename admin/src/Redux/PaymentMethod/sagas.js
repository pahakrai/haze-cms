import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { PaymentMethodTypes, PaymentMethodActions } from './actions';
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

export let getPaymentMethods = handlePaginate('paymentMethods', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getPaymentMethods,
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
      Schemas.paymentMethodSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PaymentMethodActions.mergeResults(result));
    } else {
      yield put(PaymentMethodActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPaymentMethodsErrors(data));
    yield put(PaymentMethodActions.setResults([]));
  }
});

export function* getPaymentMethodById(api, { id }) {
  const response = yield call(api.getPaymentMethodById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.paymentMethodSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPaymentMethodsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getAllPaymentMethod(api, { opts }) {
  const response = yield call(api.getPaymentMethods, opts);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.paymentMethodSchema
    ]);
    yield put(PaymentMethodActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPaymentMethodsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPaymentMethod(api, { formValues }) {
  const formName = Form.PAYMENT_METHOD_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createPaymentMethod, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.paymentMethodSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(PaymentMethodActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updatePaymentMethod(api, { formValues }) {
  const formName = Form.PAYMENT_METHOD_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updatePaymentMethod, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.paymentMethodSchema]);
    yield put(ResourceActions.addEntities(entities));
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
    takeLatest(PaymentMethodTypes.GET_PAYMENT_METHODS, getPaymentMethods, api),
    takeLatest(
      PaymentMethodTypes.GET_ALL_PAYMENT_METHOD,
      getAllPaymentMethod,
      api
    ),
    takeLatest(
      PaymentMethodTypes.GET_PAYMENT_METHOD_BY_ID,
      getPaymentMethodById,
      api
    ),
    takeLatest(
      PaymentMethodTypes.UPDATE_PAYMENT_METHOD,
      updatePaymentMethod,
      api
    ),
    takeLatest(
      PaymentMethodTypes.CREATE_PAYMENT_METHOD,
      createPaymentMethod,
      api
    )
  ]);
}
