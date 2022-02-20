import React from 'react';
import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { toast } from '../../Lib/Toast';
import { FormattedMessage } from 'react-intl';
import {
  WorkspacePaymentMethodActions,
  WorkspacePaymentMethodTypes
} from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';

import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { appendQueryWorkspace } from '../utils';

export let getWorkspacePaymentMethods = handlePaginate(
  'workspacePaymentMethods',
  {
    call: function* (api, { opts = { query: {} } }, paginate) {
      let { offset = 0, limit } = paginate;
      const state = yield select(state => state);
      const query = appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts.query,
        populates: ['paymentMethod', ...(opts.query.populates || [])]
      });
      const result = yield call(api.getWorkspacePaymentMethods, query);
      return result;
    },
    onSuccess: function* (data, paginate) {
      const { entities, result } = yield normalize(data, [
        Schemas.workspacePaymentMethodSchema
      ]);
      yield put(ResourceActions.addEntities(entities));
      if (paginate.append) {
        yield put(WorkspacePaymentMethodActions.mergeResults(result));
      } else {
        yield put(WorkspacePaymentMethodActions.setResults(result));
      }
    },
    onFailed: function* (data) {
      yield put(ErrorActions.setGetWorkspacePaymentMethodsErrors(data));
    }
  }
);

export function* getWorkspacePaymentMethodById(api, { id, query = {} }) {
  const response = yield call(api.getWorkspacePaymentMethodById, id, {
    ...query,
    populates: [...(query.populates || [])]
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.workspacePaymentMethodSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspacePaymentMethodErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getAllWorkspacePaymentMethods(api, { query }) {
  const response = yield call(api.getWorkspacePaymentMethods, {
    ...query,
    populates: ['paymentMethod']
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.workspacePaymentMethodSchema
    ]);
    yield put(WorkspacePaymentMethodActions.setAllResults(result));

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspacePaymentMethodsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createWorkspacePaymentMethod(api, { formValues }) {
  yield put(WorkspacePaymentMethodActions.setSelected(''));
  const formName = Form.WORKSPACE_PAYMENT_METHOD_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createWorkspacePaymentMethod, formValues);
  function* onSuccess(data) {
    yield put(WorkspacePaymentMethodActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateWorkspacePaymentMethod(api, { formValues }) {
  const formName = Form.WORKSPACE_PAYMENT_METHOD_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateWorkspacePaymentMethod, formValues);
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

export function* toggleActive(api, { id, active }) {
  yield put(LoadingActions.setLoading('toggleActive', true));
  const response = yield call(api.toggleActive, id, active);
  function* onSuccess(data) {
    const { entities } = yield normalize(
      [data],
      [Schemas.workspacePaymentMethodSchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(WorkspacePaymentMethodActions.getWorkspacePaymentMethods());
    yield put(LoadingActions.setLoading('toggleActive', false));
  }
  function* onFailed(data) {
    yield put(LoadingActions.setLoading('toggleActive', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deleteWorkspacePaymentMethod(api, { id }) {
  const response = yield call(api.deleteWorkspacePaymentMethod, id);
  function* onSuccess(data) {
    const results = yield select(state => state.workspacePaymentMethod.results);
    yield put(
      WorkspacePaymentMethodActions.setResults(results.filter(v => v !== id))
    );
    yield put(
      WorkspacePaymentMethodActions.getWorkspacePaymentMethods({
        query: {},
        refresh: true
      })
    );
    toast.success(<FormattedMessage id="msg.delete_successful" />);
  }
  function* onFailed(data) {
    yield put(ErrorActions.setDeleteWorkspacePaymentMethodErrors(data));
    data && data.message
      ? toast.error(data.message)
      : toast.error(<FormattedMessage id="msg.delete_failure" />);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(
      WorkspacePaymentMethodTypes.GET_WORKSPACE_PAYMENT_METHODS,
      getWorkspacePaymentMethods,
      api
    ),
    takeLatest(
      WorkspacePaymentMethodTypes.GET_ALL_WORKSPACE_PAYMENT_METHODS,
      getAllWorkspacePaymentMethods,
      api
    ),
    takeLatest(
      WorkspacePaymentMethodTypes.GET_WORKSPACE_PAYMENT_METHOD_BY_ID,
      getWorkspacePaymentMethodById,
      api
    ),
    takeLatest(
      WorkspacePaymentMethodTypes.CREATE_WORKSPACE_PAYMENT_METHOD,
      createWorkspacePaymentMethod,
      api
    ),
    takeLatest(
      WorkspacePaymentMethodTypes.UPDATE_WORKSPACE_PAYMENT_METHOD,
      updateWorkspacePaymentMethod,
      api
    ),
    takeLatest(WorkspacePaymentMethodTypes.TOGGLE_ACTIVE, toggleActive, api),
    takeLatest(
      WorkspacePaymentMethodTypes.DELETE_WORKSPACE_PAYMENT_METHOD,
      deleteWorkspacePaymentMethod,
      api
    )
  ]);
}
