import React from 'react';
import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { TunnelActions, TunnelTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { toast } from '../../Lib/Toast';

import { appendQueryWorkspace } from '../utils';

export let getTunnels = handlePaginate('tunnel', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = appendQueryWorkspace(state, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...opts.query,
      populates: [
        'pricingTunnel',
        'pricingTunnel.pricing',
        ...(opts.query.populates || [])
      ]
    });
    const result = yield call(api.getTunnels, query);
    return result;
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.tunnelSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(TunnelActions.mergeResults(result));
    } else {
      yield put(TunnelActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetTunnelsErrors(data));
  }
});

export function* getAllTunnel(api, { opts }) {
  const response = yield call(api.getTunnels, opts);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.tunnelSchema]);
    yield put(TunnelActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetTunnelsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getTunnelById(api, { id }) {
  const response = yield call(api.getTunnelById, id);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.tunnelSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetTunnelsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createTunnel(api, { tunnel, iconFiles, iconActiveFiles }) {
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
  yield put(startSubmit(Form.TUNNEL_CREATE));
  const state = yield select(state => state);
  const response = yield call(
    api.createTunnel,
    appendQueryWorkspace(state, { ...tunnel }),
    iconFiles,
    iconActiveFiles,
    onUploadProgress
  );

  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.TUNNEL_CREATE));
    const { entities } = yield normalize(
      [data],
      [Schemas.vehicleCategorySchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(TunnelActions.setCreated(data._id));
    yield put(TunnelActions.setSelected(data._id));
    yield put(stopSubmit(Form.TUNNEL_CREATE));
  }
  function* onFailed(data) {
    toast.update(toastId, {
      render: `Create failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.TUNNEL_CREATE));
    yield put(stopSubmit(Form.TUNNEL_CREATE, getErrorFromResponse(null, data)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateTunnel(api, { tunnel, iconFiles, iconActiveFiles }) {
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
  yield put(startSubmit(Form.TUNNEL_UPDATE));
  const response = yield call(
    api.updateTunnel,
    tunnel,
    iconFiles,
    iconActiveFiles,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.TUNNEL_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.TUNNEL_UPDATE));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: `Update failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.TUNNEL_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([takeLatest(TunnelTypes.GET_TUNNELS, getTunnels, api)]);
  yield all([takeLatest(TunnelTypes.GET_ALL_TUNNEL, getAllTunnel, api)]);
  yield all([takeLatest(TunnelTypes.CREATE_TUNNEL, createTunnel, api)]);
  yield all([takeLatest(TunnelTypes.UPDATE_TUNNEL, updateTunnel, api)]);
  yield all([takeLatest(TunnelTypes.GET_TUNNEL_BY_ID, getTunnelById, api)]);
}
