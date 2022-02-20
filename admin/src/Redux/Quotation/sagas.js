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
import React from 'react';
import { toast } from '../../Lib/Toast';
import { FormattedMessage } from 'react-intl';

import { QuotationActions, QuotationTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';

import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { appendQueryWorkspace } from '../utils';

export let getQuotations = handlePaginate('quotations', {
  call: function* (api, { opts = { query: {}, page: 1 } }, paginate) {
    let { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = appendQueryWorkspace(state, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...opts.query,
      populates: ['client', ...(opts.query.populates || [])]
    });
    const result = yield call(api.getQuotations, query);
    return result;
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.quotationSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(QuotationActions.mergeResults(result));
    } else {
      yield put(QuotationActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetQuotationsErrors(data));
  }
});

export function* getQuotationById(api, { id, query = {} }) {
  const response = yield call(api.getQuotationById, id, {
    ...query,
    populates: [
      'client',
      'billingContact',
      'contactAddress',
      ...(query.populates || [])
    ]
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.quotationSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetQuotationErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createQuotation(api, { formValues }) {
  yield put(QuotationActions.setSelected(''));
  const formName = Form.QUOTATION_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createQuotation, formValues);
  function* onSuccess(data) {
    yield put(QuotationActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateQuotation(api, { formValues }) {
  const formName = Form.QUOTATION_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateQuotation, formValues);
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

export function* convertToOrder(api, { id, formValues }) {
  const response = yield call(api.convertToOrder, id, formValues);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="updated_successfully" />);
    yield put(QuotationActions.getQuotationById(id));
  }
  function* onFailed(data) {
    toast.error(<FormattedMessage id="updated_failure" />);
    yield put(ErrorActions.setGetQuotationErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLeading(QuotationTypes.GET_QUOTATIONS, getQuotations, api),
    takeLatest(QuotationTypes.GET_QUOTATION_BY_ID, getQuotationById, api),
    takeLatest(QuotationTypes.CREATE_QUOTATION, createQuotation, api),
    takeLatest(QuotationTypes.UPDATE_QUOTATION, updateQuotation, api),
    takeLatest(QuotationTypes.CONVERT_TO_ORDER, convertToOrder, api)
  ]);
}
