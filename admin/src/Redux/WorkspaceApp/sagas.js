import React from 'react';
import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { normalize } from 'normalizr';

import { toast } from '../../Lib/Toast';
import Form from '../../Constants/Form';
import { getErrorFromResponse } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import { entities as Schemas } from '../../Services/Schemas';
import { WorkspaceAppActions, WorkspaceAppTypes } from './actions';

export let getWorkspaceApps = handlePaginate('workspaceApps', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    let { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = appendQueryWorkspace(state, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...opts.query,
      populates: [...(opts.query.populates || [])]
    });
    const result = yield call(api.getWorkspaceApps, query);
    return result;
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.workspaceAppSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(WorkspaceAppActions.mergeResults(result));
    } else {
      yield put(WorkspaceAppActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetWorkspaceAppsErrors(data));
  }
});

export function* getWorkspaceAppById(api, { id, query = {} }) {
  const response = yield call(api.getWorkspaceAppById, id, {
    ...query,
    populates: [...(query.populates || [])]
  });
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.workspaceAppSchema);

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceAppErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createWorkspaceApp(api, { formValues }) {
  yield put(WorkspaceAppActions.setSelected(''));
  const formName = Form.WORKSPACE_APP_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createWorkspaceApp, formValues);
  function* onSuccess(data) {
    yield put(
      WorkspaceAppActions.getWorkspaceApps({
        query: {},
        refresh: true
      })
    );
    yield put(WorkspaceAppActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateWorkspaceApp(api, { formValues }) {
  const formName = Form.WORKSPACE_APP_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateWorkspaceApp, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
    window.location = '/workspace-app/' + data._id;
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deleteWorkspaceApp(api, { id }) {
  const response = yield call(api.deleteWorkspaceApp, id);
  function* onSuccess(data) {
    const results = yield select(state => state.workspaceApp.results);
    yield put(WorkspaceAppActions.setResults(results.filter(v => v !== id)));
    yield put(
      WorkspaceAppActions.getWorkspaceApps({
        query: {},
        refresh: true
      })
    );
    toast.success(<FormattedMessage id="msg.delete_successful" />);
  }
  function* onFailed(data) {
    yield put(ErrorActions.setDeleteWorkspaceAppErrors(data));
    data && data.message
      ? toast.error(data.message)
      : toast.error(<FormattedMessage id="msg.delete_failure" />);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* releaseNewVersion(api, { id, platformType }) {
  yield put(LoadingActions.setLoading('releaseNewVersion', true));
  const response = yield call(api.releaseNewVersion, id, platformType);
  function* onSuccess(data) {
    toast.success(
      <FormattedMessage id="display_workspace_app_release_successful" />
    );
    const { entities } = yield normalize([data], [Schemas.workspaceAppSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(WorkspaceAppActions.getWorkspacePaymentMethods());
    yield put(LoadingActions.setLoading('releaseNewVersion', false));
    yield put(
      WorkspaceAppActions.getWorkspaceApps({
        query: {},
        refresh: true
      })
    );
  }
  function* onFailed(data) {
    yield put(LoadingActions.setLoading('releaseNewVersion', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createNewVersion(api, { id, platformType, value }) {
  yield put(LoadingActions.setLoading('createNewVersion', true));
  const response = yield call(api.createNewVersion, id, platformType, value);
  function* onSuccess(data) {
    toast.success(
      <FormattedMessage id="display_workspace_app_create_successful" />
    );
    const { entities } = yield normalize([data], [Schemas.workspaceAppSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(WorkspaceAppActions.getWorkspaceApps());
    yield put(LoadingActions.setLoading('createNewVersion', false));
    yield put(
      WorkspaceAppActions.getWorkspaceApps({
        query: {},
        refresh: true
      })
    );
    window.location = '/workspace-app/' + id;
  }
  function* onFailed(data) {
    toast.error(data.message);
    yield put(LoadingActions.setLoading('createNewVersion', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(WorkspaceAppTypes.GET_WORKSPACE_APPS, getWorkspaceApps, api),
    takeLatest(
      WorkspaceAppTypes.GET_WORKSPACE_APP_BY_ID,
      getWorkspaceAppById,
      api
    ),
    takeLatest(WorkspaceAppTypes.CREATE_WORKSPACE_APP, createWorkspaceApp, api),
    takeLatest(WorkspaceAppTypes.UPDATE_WORKSPACE_APP, updateWorkspaceApp, api),
    takeLatest(WorkspaceAppTypes.DELETE_WORKSPACE_APP, deleteWorkspaceApp, api),
    takeLatest(WorkspaceAppTypes.RELEASE_NEW_VERSION, releaseNewVersion, api),
    takeLatest(WorkspaceAppTypes.CREATE_NEW_VERSION, createNewVersion, api)
  ]);
}
