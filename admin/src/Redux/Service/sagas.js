import React from 'react';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { FormattedMessage } from 'react-intl';
import { handleResponse, handlePaginate } from '../utils/saga';

import ResourceActions from '../Resources/actions';
import { ErrorActions } from '../Error/actions';
import Form from '../../Constants/Form';
import { toast } from '../../Lib/Toast';

import { getErrorFromResponse } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { ServiceTypes, ServiceActions } from './actions';

export function* getAllService(api, { opts = {} }) {
  const state = yield select(state => state);
  const response = yield call(
    api.getServices,
    appendQueryWorkspace(state, {
      ...opts,
      populates: ['uom', ...(opts.populates || [])]
    })
  );
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.serviceSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ServiceActions.setAllResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetServicesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export let getServices = handlePaginate('services', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getServices,
      appendQueryWorkspace(state, {
        offset,
        limit,
        localize: true,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page,
        populates: [
          'uom',
          'category',
          'pricingService',
          'pricingService.pricing',
          ...(query.populates || [])
        ]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.serviceSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(ServiceActions.mergeResults(result));
    } else {
      yield put(ServiceActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetServicesErrors(data));
  }
});

export function* getServiceById(api, { id }) {
  const state = yield select(state => state);
  const response = yield call(
    api.getServiceById,
    id,
    appendQueryWorkspace(state, {
      populates: ['category']
    })
  );
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.serviceSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetServicesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createService(api, { service, files }) {
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
  yield put(startSubmit(Form.SERVICE_CREATE));
  const state = yield select(state => state);
  const response = yield call(
    api.createService,
    appendQueryWorkspace(state, { ...service }),
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.SERVICE_CREATE));
    const { entities } = yield normalize([data], [Schemas.serviceSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ServiceActions.setSelected(data._id));
    yield put(stopSubmit(Form.SERVICE_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.SERVICE_CREATE));
    yield put(
      stopSubmit(Form.SERVICE_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateService(api, { id, service, files }) {
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
  yield put(startSubmit(Form.SERVICE_UPDATE));
  const response = yield call(
    api.updateService,
    id,
    service,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.SERVICE_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.SERVICE_UPDATE));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.SERVICE_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(ServiceTypes.GET_SERVICES, getServices, api),
    takeLatest(ServiceTypes.GET_ALL_SERVICE, getAllService, api),
    takeLatest(ServiceTypes.CREATE_SERVICE, createService, api),
    takeLatest(ServiceTypes.UPDATE_SERVICE, updateService, api),
    takeLatest(ServiceTypes.GET_SERVICE_BY_ID, getServiceById, api)
  ]);
}
