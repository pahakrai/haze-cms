import React from 'react';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { PaymentTypes, PaymentActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { FormattedMessage } from 'react-intl';

import { toast } from '../../Lib/Toast';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getPayments = handlePaginate('payments', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getPayments,
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
    const { entities, result } = yield normalize(data, [Schemas.paymentSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PaymentActions.mergeResults(result));
    } else {
      yield put(PaymentActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPaymentsErrors(data));
    yield put(PaymentActions.setResults([]));
  }
});

export function* getPaymentById(api, { id }) {
  const response = yield call(api.getPaymentById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.paymentSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPaymentsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getPaymentByOrderId(api, { orderId }) {
  const response = yield call(api.getPayments, {
    order: orderId,
    populates: ['$transactions.paymentMethod']
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(data, [
      Schemas.paymentSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
  }
  function* onFailed(data) {
    yield put(ErrorActions.setGetPaymentsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPayment(api, { formValues, files }) {
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
  const formName = Form.PAYMENT_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(
    api.createPayment,
    formValues,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.paymentSchema]);
    yield put(ResourceActions.addEntities(entities));
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

export function* updatePayment(api, { formValues }) {
  const { PAYMENT_UPDATE, ORDER_PAYMENT_TRANSACTONS_CREATE } = Form;
  const formName = PAYMENT_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updatePayment, formValues);
  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.paymentSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
    yield put(setSubmitSucceeded(formName));
    yield put(setSubmitSucceeded(ORDER_PAYMENT_TRANSACTONS_CREATE));
    yield put(stopSubmit(ORDER_PAYMENT_TRANSACTONS_CREATE));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
    yield put(
      stopSubmit(
        ORDER_PAYMENT_TRANSACTONS_CREATE,
        getErrorFromResponse(ORDER_PAYMENT_TRANSACTONS_CREATE, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createTransaction(api, { formValues, files, opts = {} }) {
  const { orderId, paymentId } = opts;
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
  const formName = Form.PAYMENT_TRANSACTION_CREATE;
  yield put(startSubmit(formName));
  let response = null;
  if (!paymentId) {
    response = yield call(
      api.createPayment,
      {
        order: orderId,
        transactions: [formValues]
      },
      files,
      onUploadProgress
    );
  } else {
    response = yield call(
      api.createTransaction,
      paymentId,
      formValues,
      files,
      onUploadProgress
    );
  }
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.paymentSchema]);
    yield put(ResourceActions.addEntities(entities));
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

export function* updateTransaction(api, { formValues, files, opts = {} }) {
  const { paymentId } = opts;
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
  const formName = Form.PAYMENT_TRANSACTION_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(
    api.updateTransaction,
    paymentId,
    formValues,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.paymentSchema]);
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

export default function* roots(api) {
  yield all([
    takeLatest(PaymentTypes.GET_PAYMENTS, getPayments, api),
    takeLatest(PaymentTypes.GET_PAYMENT_BY_ID, getPaymentById, api),
    takeLatest(PaymentTypes.UPDATE_PAYMENT, updatePayment, api),
    takeLatest(PaymentTypes.CREATE_PAYMENT, createPayment, api),
    takeLatest(PaymentTypes.GET_PAYMENT_BY_ORDER_ID, getPaymentByOrderId, api),
    takeLatest(PaymentTypes.CREATE_TRANSACTION, createTransaction, api),
    takeLatest(PaymentTypes.UPDATE_TRANSACTION, updateTransaction, api)
  ]);
}
