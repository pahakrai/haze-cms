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
  WorkspaceSubscriptionActions,
  WorkspaceSubscriptionTypes
} from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';

import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { appendQueryWorkspace } from '../utils';

export let getWorkspaceSubscriptions = handlePaginate(
  'workspaceSubscriptions',
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
        populates: [
          'subscriptionPlan',
          'subscriptionPlan.$items.item',
          ...(opts.query.populates || [])
        ]
      });
      const result = yield call(api.getWorkspaceSubscriptions, query);
      return result;
    },
    onSuccess: function* (data, paginate) {
      const { entities, result } = yield normalize(data, [
        Schemas.workspaceSubscriptionSchema
      ]);
      yield put(ResourceActions.addEntities(entities));
      if (paginate.append) {
        yield put(WorkspaceSubscriptionActions.mergeResults(result));
      } else {
        yield put(WorkspaceSubscriptionActions.setResults(result));
      }
    },
    onFailed: function* (data) {
      yield put(ErrorActions.setGetWorkspaceSubscriptionsErrors(data));
    }
  }
);

export function* getWorkspaceSubscriptionById(api, { id, query = {} }) {
  const response = yield call(api.getWorkspaceSubscriptionById, id, {
    ...query,
    populates: [...(query.populates || [])]
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.workspaceSubscriptionSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceSubscriptionErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createWorkspaceSubscription(api, { formValues }) {
  yield put(WorkspaceSubscriptionActions.setSelected(''));
  const formName = Form.WORKSPACE_SUBSCRIPTION_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createWorkspaceSubscription, formValues);
  function* onSuccess(data) {
    yield put(WorkspaceSubscriptionActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateWorkspaceSubscription(api, { formValues }) {
  const formName = Form.WORKSPACE_SUBSCRIPTION_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateWorkspaceSubscription, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
    yield put(
      WorkspaceSubscriptionActions.getWorkspaceSubscriptions({
        query: {},
        refresh: true
      })
    );
    toast.success(<FormattedMessage id="updated_successfully" />);
  }

  function* onFailed(data) {
    toast.success(<FormattedMessage id="updated_failure" />);
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(
      WorkspaceSubscriptionTypes.GET_WORKSPACE_SUBSCRIPTIONS,
      getWorkspaceSubscriptions,
      api
    ),
    takeLatest(
      WorkspaceSubscriptionTypes.GET_WORKSPACE_SUBSCRIPTION_BY_ID,
      getWorkspaceSubscriptionById,
      api
    ),
    takeLatest(
      WorkspaceSubscriptionTypes.CREATE_WORKSPACE_SUBSCRIPTION,
      createWorkspaceSubscription,
      api
    ),
    takeLatest(
      WorkspaceSubscriptionTypes.UPDATE_WORKSPACE_SUBSCRIPTION,
      updateWorkspaceSubscription,
      api
    )
  ]);
}
