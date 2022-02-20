import React from 'react';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { GangTypes, GangActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { toast } from '../../Lib/Toast';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getGangs = handlePaginate('gangs', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getGangs,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts.query,
        populates: ['users', ...(opts.query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.gangSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(GangActions.mergeResults(result));
    } else {
      yield put(GangActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetGangsErrors(data));
    yield put(GangActions.setResults([]));
  }
});

export function* getGangById(api, { id, query }) {
  const response = yield call(api.getGangById, id, {
    ...query,
    populates: [
      'users',
      'users.user',
      'users.user.userVehicle',
      'users.user.userVehicle.vehicle.type',
      'users.user.userVehicle.vehicle.model'
    ]
  });
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.gangSchema);
    yield put(ResourceActions.addEntities(entities));
    yield put(GangActions.setEditForm(data));
    yield put(GangActions.setSelected(data._id));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetGangsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createGang(api, { formValues }) {
  const formName = Form.GANG_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createGang, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.gangSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(GangActions.setSelected(data._id));

    yield put(stopSubmit(formName));
    yield put(GangActions.getGangs());
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateGang(api, { formValues }) {
  const formName = Form.GANG_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateGang, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.gangSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* importDriver(api, { id, files }) {
  const formName = Form.IMPORT_DRIVER;
  yield put(startSubmit(formName));
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  const response = yield call(api.importDriver, id, files, onUploadProgress);
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
    yield put(ErrorActions.setGetGangsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export default function* roots(api) {
  yield all([
    takeLatest(GangTypes.GET_GANGS, getGangs, api),
    takeLatest(GangTypes.GET_GANG_BY_ID, getGangById, api),
    takeLatest(GangTypes.UPDATE_GANG, updateGang, api),
    takeLatest(GangTypes.CREATE_GANG, createGang, api),
    takeLatest(GangTypes.IMPORT_DRIVER, importDriver, api)
  ]);
}
