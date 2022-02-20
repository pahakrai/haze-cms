import React from 'react';
import { FormattedMessage } from 'react-intl';
import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';

import { appendQueryWorkspace } from '../utils';
import { toast } from '../../Lib/Toast';

import { entities as Schemas } from '../../Services/Schemas';

import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';

import { RegionActions, RegionTypes } from './actions';

export function* getRegions(api, { query = {} }) {
  const response = yield call(
    api.getRegions,
    appendQueryWorkspace(yield select(state => state), query)
  );

  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.regionSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(RegionActions.setResults(result));
    query.parent !== undefined &&
      (yield put(ResourceActions.addRegions(entities, query.parent, result)));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetRegionsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getAllRegionsWithChildren(api) {
  yield put(RegionActions.setRegionsWithChildrenResult([]));
  const response = yield call(
    api.getAllWithChildren,
    appendQueryWorkspace(yield select(state => state), {})
  );

  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.regionSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(RegionActions.setRegionsWithChildrenResult(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetRegionsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getRegionById(api, { id }) {
  const response = yield call(api.getRegionById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.regionSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetRegionsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createRegion(api, { formValues, files }) {
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
  const formName = Form.REGION_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(
    api.createRegion,
    formValues,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    // const { entities } = yield normalize([data], [Schemas.regionSchema]);
    // yield put(ResourceActions.addEntities(entities));
    yield put(RegionActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateRegion(api, { formValues, files }) {
  const formName = Form.REGION_UPDATE;
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

  yield put(startSubmit(formName));
  const response = yield call(
    api.updateRegion,
    formValues,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    // const { entities } = yield normalize([data], [Schemas.regionSchema]);
    // yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deleteRegion(api, { id }) {
  yield LoadingActions.setLoading('deleteRegion', true);
  const response = yield call(api.deleteRegion, id);
  function* onSuccess() {
    const allResults = yield select(state => state.region.allResults);

    yield put(RegionActions.setAllResults(allResults.filter(v => v !== id)));
    toast.success(<FormattedMessage id="msg.delete_successful" />);
  }

  function onFailed(data) {
    toast.error(data.message);
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield LoadingActions.setLoading('deleteRegion', false);
}

export function* getRegionPins(api) {
  const response = yield call(api.getRegionPins);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.regionPinSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(RegionActions.setRegionPins(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetRegionsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deleteRegionPin(api, { id }) {
  const response = yield call(api.deleteRegionPin, id);
  function* onSuccess(data) {
    yield put(RegionActions.getRegionPins());
  }

  function* onFailed(data) {
    yield put(ErrorActions.setDeleteRegionErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createRegionPin(api, { regionPin }) {
  const response = yield call(api.createRegionPin, regionPin);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(
      [data],
      [Schemas.regionPinSchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(RegionActions.mergeRegionPins(result));
  }
  function* onFailed(data) {}

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateRegionPin(api, { regionPin }) {
  yield put(startSubmit(Form.REGION_PIN_UPDATE));
  const response = yield call(api.updateRegionPin, regionPin);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.REGION_PIN_UPDATE));
    const { entities } = yield normalize([data], [Schemas.regionPinSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.REGION_PIN_UPDATE));
  }
  function* onFailed(data) {
    yield put(
      stopSubmit(Form.REGION_PIN_UPDATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getAllRegion(api, { query = {}, refresh }) {
  const response = yield call(
    api.getRegions,
    appendQueryWorkspace(yield select(state => state), query)
  );
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.regionSchema]);
    if (refresh) {
      yield put(RegionActions.setAllResults(result));
    } else {
      yield put(RegionActions.mergeAllResults(result));
    }

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetRegionsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getAllDistrict(api, { query = {}, refresh }) {
  const response = yield call(
    api.getAllDistrict,
    appendQueryWorkspace(yield select(state => state), query)
  );
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.regionSchema]);
    yield put(RegionActions.setAllDistrict(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetRegionsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    // updateRegionPin
    takeLatest(RegionTypes.UPDATE_REGION_PIN, updateRegionPin, api),

    // createRegionPin
    takeLatest(RegionTypes.CREATE_REGION_PIN, createRegionPin, api),
    // deleteRegionPin
    takeLatest(RegionTypes.DELETE_REGION_PIN, deleteRegionPin, api),
    // getRegionPins
    takeLatest(RegionTypes.GET_REGION_PINS, getRegionPins, api),
    takeLatest(RegionTypes.GET_REGIONS, getRegions, api),
    takeLatest(
      RegionTypes.GET_ALL_REGIONS_WITH_CHILDREN,
      getAllRegionsWithChildren,
      api
    ),
    takeLatest(RegionTypes.CREATE_REGION, createRegion, api),
    takeLatest(RegionTypes.UPDATE_REGION, updateRegion, api),
    takeLatest(RegionTypes.DELETE_REGION, deleteRegion, api),
    takeLatest(RegionTypes.GET_ALL_REGION, getAllRegion, api),
    takeLatest(RegionTypes.GET_ALL_DISTRICT, getAllDistrict, api),
    takeLatest(RegionTypes.GET_REGION_BY_ID, getRegionById, api)
  ]);
}
