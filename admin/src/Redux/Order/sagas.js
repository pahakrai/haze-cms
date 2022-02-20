import {
  all,
  put,
  takeLatest,
  call,
  select,
  takeLeading
} from 'redux-saga/effects';
import React from 'react';
import { toast } from '../../Lib/Toast';
import { FormattedMessage } from 'react-intl';
import { OrderTypes, OrderActions } from './actions';
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
import { DriverActions } from '../Driver/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getOrders = handlePaginate('orders', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};

    return yield call(
      api.getOrders,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: [
          'vehicleType',
          'time',
          'logistic',
          'logistic.$locFr.$properties.regions',
          'logistic.$locTo.$properties.regions',
          'logistic.vehicleType',
          'logistic.storeTo.address',
          'client'
        ]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.orderSchema]);
    yield put(ResourceActions.addEntities(entities));
    // if (paginate.append) {
    //   yield put(OrderActions.mergeResults(result));
    // } else {
    yield put(OrderActions.setResults(result));
    // }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetOrdersErrors(data));
    yield put(OrderActions.setResults([]));
  }
});

export function* getOrderById(api, { id, query = {} }) {
  const response = yield call(api.getOrderById, id, {
    ...query,
    populates: [
      'billingContact',
      'contactAddress',
      'product',
      'product.$items.product',
      'product.$items.productSKU',
      'product.$items.productSKU.$specs.spec',
      'workspace',
      'client',
      'quotation',
      'eventCampaigns',
      'eventCampaigns.eventCampaign',
      'eventCampaigns.eventCampaign.product',
      '$services.service',
      'time',
      'logistic',
      'logistic.vehicle.type',
      'logistic.vehicle.make',
      'logistic.peopleInCharge',
      'logistic.$locFr.$properties.district',
      'logistic.$locTo.$properties.district',
      'logisticItems',
      ...(query.populates || [])
    ]
  });
  function* onSuccess(data) {
    if (data.driver && data.driver._id) {
      yield put(DriverActions.getDriverById(data.driver._id));
    }
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.orderSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetOrdersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createOrder(api, { formValues }) {
  yield put(OrderActions.setSelected(''));
  const formName = Form.ORDER_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createOrder, formValues);
  function* onSuccess(data) {
    yield put(OrderActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateOrder(api, { formValues }) {
  const formName = Form.ORDER_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateOrder, formValues);
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

export function* cancelOrder(api, { id }) {
  yield put(LoadingActions.setLoading('cancelOrder', true));

  const response = yield call(api.cancelOrder, id);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="display_order_cancel_success" />);
    yield put(ResourceActions.removeOrder(id));
    yield put(OrderActions.getOrderById(id));
  }
  function* onFailed(data) {
    toast.error(<FormattedMessage id="display_order_cancel_failure" />);
    yield put(ErrorActions.setGetOrdersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('cancelOrder', false));
}
export function* updateOrderStatus(api, { id, status }) {
  yield put(LoadingActions.setLoading('updateOrderStatus', true));

  const response = yield call(api.updateOrderStatus, id, status);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="updated_successfully" />);
    yield put(ResourceActions.removeOrder(id));
    yield put(OrderActions.getOrderById(id));
  }
  function* onFailed(data) {
    toast.error(<FormattedMessage id="updated_failure" />);
    yield put(ErrorActions.setGetOrdersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('updateOrderStatus', false));
}
export function* releaseOrder(api, { id }) {
  yield put(LoadingActions.setLoading('releaseOrder', true));
  const response = yield call(api.releaseOrder, id);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="display_order_release_success" />);
    yield put(ResourceActions.removeOrder(id));
    yield put(OrderActions.getOrderById(id));
  }
  function* onFailed(data) {
    toast.error(<FormattedMessage id="display_order_release_failure" />);
    yield put(ErrorActions.setGetOrdersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('releaseOrder', false));
}

export function* importOrder(api, { files }) {
  const formName = Form.IMPORT_ORDER;
  yield put(startSubmit(formName));
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  const response = yield call(api.importOrder, files, onUploadProgress);
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: data?.message ? (
        data?.message
      ) : (
        <FormattedMessage id="upload_failure" />
      ),
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(formName));
    yield put(ErrorActions.setGetOrdersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export default function* roots(api) {
  yield all([
    takeLeading(OrderTypes.GET_ORDERS, getOrders, api),
    takeLatest(OrderTypes.GET_ORDER_BY_ID, getOrderById, api),
    takeLatest(OrderTypes.UPDATE_ORDER, updateOrder, api),
    takeLatest(OrderTypes.CREATE_ORDER, createOrder, api),
    takeLatest(OrderTypes.UPDATE_ORDER_STATUS, updateOrderStatus, api),
    takeLeading(OrderTypes.CANCEL_ORDER, cancelOrder, api),
    takeLeading(OrderTypes.RELEASE_ORDER, releaseOrder, api),
    takeLatest(OrderTypes.IMPORT_ORDER, importOrder, api)
  ]);
}
