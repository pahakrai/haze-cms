// import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  all,
  takeLatest,
  call,
  put,
  select,
  takeLeading
} from 'redux-saga/effects';
import React from 'react';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { toast } from '../../Lib/Toast';
import { FormattedMessage } from 'react-intl';
import { ShipmentActions, ShipmentTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';

import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { appendQueryWorkspace } from '../utils';

export let getShipments = handlePaginate('shipments', {
  call: function* (api, { opts = { query: {}, page: 1 } }, paginate) {
    let { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = appendQueryWorkspace(state, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...opts.query,
      populates: ['tracking.courier', ...(opts.query.populates || [])]
    });
    const result = yield call(api.getShipments, query);
    return result;
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.shipmentSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(ShipmentActions.mergeResults(result));
    } else {
      yield put(ShipmentActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetShipmentsErrors(data));
  }
});

export function* getShipmentById(api, { id, query = {} }) {
  const response = yield call(api.getShipmentById, id, {
    ...query,
    populates: [...(query.populates || [])]
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.shipmentSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetShipmentErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getShipmentByOrderId(api, { orderId }) {
  const response = yield call(api.getShipments, {
    order: orderId,
    populates: ['tracking.courier']
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(data, [
      Schemas.shipmentSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
  }
  function* onFailed(data) {
    yield put(ErrorActions.setGetShipmentErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createShipment(api, { formValues }) {
  yield put(ShipmentActions.setSelected(''));
  const formName = Form.SHIPMENT_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createShipment, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.shipmentSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName)); // yield put getoeder
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateShipment(api, { formValues }) {
  const formName = Form.SHIPMENT_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateShipment, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.shipmentSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateShipmentStatus(api, { id, status }) {
  yield put(LoadingActions.setLoading('updateShipmentStatus', true));

  const response = yield call(api.updateShipmentStatus, id, status);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="updated_successfully" />);
    yield put(ResourceActions.removeOrder(id));
    yield put(ShipmentActions.getShipmentById(id));
  }
  function* onFailed(data) {
    toast.error(<FormattedMessage id="updated_failure" />);
    yield put(ErrorActions.setGetOrdersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('updateShipmentStatus', false));
}

export default function* roots(api) {
  yield all([
    takeLeading(ShipmentTypes.GET_SHIPMENTS, getShipments, api),
    takeLatest(ShipmentTypes.GET_SHIPMENT_BY_ID, getShipmentById, api),
    takeLatest(ShipmentTypes.CREATE_SHIPMENT, createShipment, api),
    takeLatest(ShipmentTypes.UPDATE_SHIPMENT, updateShipment, api),
    takeLatest(ShipmentTypes.UPDATE_SHIPMENT_STATUS, updateShipmentStatus, api)
  ]);
}
