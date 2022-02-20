import React from 'react';
import { FormattedMessage } from 'react-intl';
import { all, takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';

import { toast } from '../../Lib/Toast';

import { entities as Schemas } from '../../Services/Schemas';

import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';

import { PrcingsActions, PricingsTypes } from './actions';

import { ServiceActions } from '../Service/actions';
import { TunnelActions } from '../Tunnel/actions';

export let getPricingsList = handlePaginate('pricings', {
  call: function* (
    api,
    { opts: filterValues = { filterValues: {} } },
    paginate
  ) {
    const { offset = 0, limit } = paginate;
    return yield call(api.getPricingsList, {
      vehicleType: filterValues.vehicleType || undefined,
      locTo: filterValues.locTo || undefined,
      locFr: filterValues.locFr || undefined,
      offset,
      limit,
      localize: true,
      paginate: true,
      sort: '-createdAt',
      ...filterValues.filterValues
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.pricingSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PrcingsActions.mergeResults(result));
    } else {
      yield put(PrcingsActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPricingsErrors(data));
  }
});

export let getPricingTunnel = handlePaginate('pricingTunnels', {
  call: function* (
    api,
    { opts: filterValues = { filterValues: {} } },
    paginate
  ) {
    const { offset = 0, limit } = paginate;

    return yield call(api.getPricingTunnel, {
      offset,
      limit,
      localize: true,
      paginate: true,
      sort: '-createdAt',
      ...filterValues,
      populates: ['service', 'pricing']
    });
  },

  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.pricingSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(PrcingsActions.setPricingResults(result));
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPricingsErrors(data));
  }
});

export function* getPricingById(api, { id }) {
  const response = yield call(api.getPricingById, id);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.pricingSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPricingsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updatePricingsById(api, { id, value }) {
  const toastId = toast.info('Update...0%', { autoClose: false });
  yield put(startSubmit(Form.PRICINGS_UPDATE));
  const response = yield call(api.updatePricingsById, id, value);
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.PRICINGS_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.PRICINGS_UPDATE));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: `Update failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.PRICINGS_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPricingService(api, { formValues }) {
  yield put(PrcingsActions.setSelected(''));
  const formName = Form.PRICING_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createPricingService, formValues);
  function* onSuccess(data) {
    yield put(PrcingsActions.setSelected(data._id));
    yield put(ServiceActions.getServices());
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPricingTunnel(api, { formValues }) {
  yield put(PrcingsActions.setSelected(''));
  const formName = Form.PRICING_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createPricingTunnel, formValues);
  function* onSuccess(data) {
    yield put(PrcingsActions.setSelected(data._id));
    yield put(
      PrcingsActions.getPricingTunnel({ tunnels: [formValues.pricingTunnel] })
    );
    yield put(PrcingsActions.getPricingTunnel());
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updatePricing(api, { formValues }) {
  const formName = Form.PRICING_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updatePricing, formValues);
  function* onSuccess(data) {
    yield put(ServiceActions.getServices());
    yield put(TunnelActions.getTunnels());
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updatePricingTunnel(api, { formValues }) {
  yield put(startSubmit(Form.PRICING_UPDATE));
  const response = yield call(api.updatePricingTunnel, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.PRICING_UPDATE));
    yield put(TunnelActions.getTunnels());
    yield put(
      PrcingsActions.getPricingTunnel({ tunnels: [formValues.pricingTunnel] })
    );
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.PRICING_UPDATE));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.PRICING_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(PricingsTypes.GET_PRICINGS_LIST, getPricingsList, api)
  ]);
  yield all([
    takeEvery(PricingsTypes.GET_PRICING_TUNNEL, getPricingTunnel, api)
  ]);
  yield all([takeLatest(PricingsTypes.GET_PRICING_BY_ID, getPricingById, api)]);
  yield all([
    takeLatest(PricingsTypes.UPDATE_PRICINGS_BY_ID, updatePricingsById, api)
  ]);
  yield all([
    takeLatest(PricingsTypes.CREATE_PRICING_SERVICE, createPricingService, api)
  ]);
  yield all([
    takeLatest(PricingsTypes.CREATE_PRICING_TUNNEL, createPricingTunnel, api)
  ]);
  yield all([
    takeLatest(PricingsTypes.UPDATE_PRICING_TUNNEL, updatePricingTunnel, api)
  ]);
  yield all([takeLatest(PricingsTypes.UPDATE_PRICING, updatePricing, api)]);
}
