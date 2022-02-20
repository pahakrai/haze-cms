import React from 'react';
import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { FormattedMessage } from 'react-intl';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';

import { entities as Schemas } from '../../Services/Schemas';
import { toast } from '../../Lib/Toast';
import { handleResponse } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import ResourceActions from '../Resources/actions';
import { ErrorActions } from '../Error/actions';
import Form from '../../Constants/Form';
import WorkspacePhoneRegionActions, {
  WorkspacePhoneRegionsTypes
} from './actions';

export let getWorkspacePhoneRegions = handlePaginate('workspacePhoneRegions', {
  call: function* (api, { opts = { filterValues: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    const state = yield select(state => state);
    return yield call(
      api.getWorkspacePhoneRegions,
      appendQueryWorkspace(state, {
        offset,
        limit,
        localize: true,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: ['phoneRegion']
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.workspacePhoneRegionSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(WorkspacePhoneRegionActions.mergeResults(result));
    } else {
      yield put(WorkspacePhoneRegionActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
});

export function* getWorkspacePhoneRegionById(api, { id }) {
  const response = yield call(api.getWorkspacePhoneRegionById, id, {
    populates: ['phoneRegion']
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.workspacePhoneRegionSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspacePhoneRegionErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createWorkspacePhoneRegion(api, { formValues }) {
  yield put(WorkspacePhoneRegionActions.setSelected(''));
  const formName = Form.WORKSPACE_PHONE_REGION_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createWorkspacePhoneRegion, formValues);
  function* onSuccess(data) {
    yield put(WorkspacePhoneRegionActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateWorkspacePhoneRegion(api, { formValues }) {
  const formName = Form.WORKSPACE_PHONE_REGION_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateWorkspacePhoneRegion, formValues);
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

export function* deleteWorkspacePhoneRegion(api, { id }) {
  const response = yield call(api.deleteWorkspacePhoneRegion, id);
  function* onSuccess(data) {
    const results = yield select(state => state.workspacePhoneRegion.results);
    yield put(
      WorkspacePhoneRegionActions.setResults(results.filter(v => v !== id))
    );
    yield put(
      WorkspacePhoneRegionActions.getWorkspacePhoneRegions({
        query: {},
        refresh: true
      })
    );
    toast.success(<FormattedMessage id="msg.delete_successful" />);
  }
  function* onFailed(data) {
    yield put(ErrorActions.setDeleteWorkspacePhoneRegionErrors(data));
    data && data.message
      ? toast.error(data.message)
      : toast.error(<FormattedMessage id="msg.delete_failure" />);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(
      WorkspacePhoneRegionsTypes.GET_WORKSPACE_PHONE_REGIONS,
      getWorkspacePhoneRegions,
      api
    ),
    takeLatest(
      WorkspacePhoneRegionsTypes.GET_WORKSPACE_PHONE_REGION_BY_ID,
      getWorkspacePhoneRegionById,
      api
    ),
    takeLatest(
      WorkspacePhoneRegionsTypes.CREATE_WORKSPACE_PHONE_REGION,
      createWorkspacePhoneRegion,
      api
    ),
    takeLatest(
      WorkspacePhoneRegionsTypes.UPDATE_WORKSPACE_PHONE_REGION,
      updateWorkspacePhoneRegion,
      api
    ),
    takeLatest(
      WorkspacePhoneRegionsTypes.DELETE_WORKSPACE_PHONE_REGION,
      deleteWorkspacePhoneRegion,
      api
    )
  ]);
}
