import {
  all,
  takeLatest,
  select,
  takeEvery,
  call,
  put
} from 'redux-saga/effects';
import React from 'react';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { toast } from '../../Lib/Toast';
import { normalize } from 'normalizr';

import { entities as Schemas } from '../../Services/Schemas';
import Form from '../../Constants/Form';
import { browserHistory } from '../../Redux';

import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { getErrorFromResponse } from '../utils/saga';
import { LoadingActions } from '../Loading/actions';
import { appendQueryWorkspace } from '../utils';

import { DriverActions, DriverTypes } from './actions';
export function* getDriversWithAll(api, { opts = {} }) {
  const {
    onSuccess: onSuccessCall,
    onFailed: onFailedCall,
    filterValues = {}
  } = opts;
  const state = yield select(state => state);
  const userRes = yield call(
    api.getUsers,
    appendQueryWorkspace(state, {
      sort: '-createdAt',
      ...filterValues
    })
  );
  if (!userRes.ok) return;
  const response = yield call(api.getDrivers, {
    sort: '-createdAt',
    users: (Array.isArray(userRes.data) ? userRes.data : []).map(u => u._id),
    isActive: true,
    ...filterValues
  });
  function* onSuccess(data) {
    if (onSuccessCall) onSuccessCall(data);
    const { entities, result } = yield normalize(data, [Schemas.driverSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(DriverActions.setResults(result));
  }

  function* onFailed(data) {
    if (onFailedCall) yield onFailedCall(data);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export let getDrivers = handlePaginate('drivers', {
  call: function* (api, { opts = {} }, paginate) {
    const { offset = 0, limit } = paginate;
    return yield call(api.getDrivers, {
      q: opts.q || '',
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...opts.filterValues
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.driverSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(DriverActions.mergeResults(result));
    } else {
      yield put(DriverActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetDriversErrors(data));
    yield put(DriverActions.setResults([]));
  }
});

export function* getDriverById(api, { id, opts }) {
  const response = yield call(api.findDriverById, id, {
    ...opts,
    populates: ['user', 'vehicle', 'vehicle.make', 'overallRating']
  });
  function* onSuccess(data) {
    if (!data || typeof data !== 'object') {
      yield onFailed();
      return;
    }
    const { entities } = yield normalize(data, Schemas.driverSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetDriversErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getDriverByUserId(api, { userId, opts }) {
  yield put(LoadingActions.setLoading('getDriverByUserId', true));
  const response = yield call(api.getDrivers, { user: userId });
  function* onSuccess(data) {
    const { entities } = yield normalize(data, [Schemas.driverSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(LoadingActions.setLoading('getDriverByUserId', false));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetDriversErrors(data));
    yield put(LoadingActions.setLoading('getDriverByUserId', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

function* updateDriverValueById(_id) {
  if (typeof _id !== 'string') {
    if (typeof _id === 'object' && _id && _id._id) {
      _id = _id._id;
    } else {
      _id = '';
    }
  }
  yield put(
    DriverActions.getDriverByUserId(_id, {
      populates: ['licenseCardImage', 'currentVehicle']
    })
  );
}

export function* createDriver(api, { opts, files }) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.DRIVER_CREATE));
  let response = null;
  // create vehicle
  response = yield call(api.createDriver, opts, files, onUploadProgress);

  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.DRIVER_CREATE));
    yield put(stopSubmit(Form.DRIVER_CREATE));
    yield updateDriverValueById(data.user);
  }
  function* onFailed(data) {
    toast.update(toastId, {
      render: `Upload failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.DRIVER_CREATE));
    yield put(stopSubmit(Form.DRIVER_CREATE, getErrorFromResponse(null, data)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateDriver(api, { opts, files }) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.DRIVER_UPDATE));
  const response = yield call(
    api.updateDriver,
    opts._id,
    opts,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.DRIVER_UPDATE));
    yield put(stopSubmit(Form.DRIVER_UPDATE));
    yield updateDriverValueById(data.user);
    // const { entities } = yield normalize([data], [Schemas.driverSchema]);
    // yield put(ResourceActions.addEntities(entities));
  }
  function* onFailed(data) {
    toast.update(toastId, {
      render: `Upload failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(stopSubmit(Form.DRIVER_UPDATE, getErrorFromResponse(null, data)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}
export function* deleteDriver(api, { id, pageType }) {
  const response = yield call(api.deleteDriver, id);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="msg.delete_successful" />);
    if (pageType === 'form') {
      yield put(DriverActions.getDrivers({ refresh: true }));
      yield put(DriverActions.setSelected(''));
      browserHistory.push('/drivers');
    }
  }
  function onFailed(data) {
    toast.error(<FormattedMessage id="msg.delete_fail" />);
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeEvery(DriverTypes.GET_DRIVERS, getDrivers, api),
    takeEvery(DriverTypes.GET_DRIVERS_WITH_ALL, getDriversWithAll, api),
    takeLatest(DriverTypes.CREATE_DRIVER, createDriver, api),
    takeLatest(DriverTypes.UPDATE_DRIVER, updateDriver, api),
    takeLatest(DriverTypes.GET_DRIVER_BY_ID, getDriverById, api),
    takeLatest(DriverTypes.DELETE_DRIVER, deleteDriver, api),
    takeLatest(DriverTypes.GET_DRIVER_BY_USER_ID, getDriverByUserId, api)
  ]);
}
