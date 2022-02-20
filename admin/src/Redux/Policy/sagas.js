import React from 'react';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { FormattedMessage } from 'react-intl';

import { toast } from '../../Lib/Toast';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import { entities as Schemas } from '../../Services/Schemas';
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { PolicyTypes, PolicyActions } from './actions';

export let getPolicies = handlePaginate('policies', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getPolicies,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts.query
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.policySchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PolicyActions.mergeResults(result));
    } else {
      yield put(PolicyActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPolicysErrors(data));
    yield put(PolicyActions.setResults([]));
  }
});

export function* getPolicyById(api, { id }) {
  const response = yield call(api.getPolicyById, id, {
    populates: ['workspaceAccess']
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.policySchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPolicysErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPolicy(api, { formValues }) {
  const formName = Form.POLICY_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createPolicy, formValues);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="created_successfully" />);
    yield put(setSubmitSucceeded(formName));
    yield put(PolicyActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    toast.error(<FormattedMessage id="created_failure" />);
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updatePolicy(api, { formValues }) {
  const formName = Form.POLICY_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updatePolicy, formValues);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="updated_successfully" />);
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    toast.error(<FormattedMessage id="updated_failure" />);
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(PolicyTypes.GET_POLICIES, getPolicies, api),
    takeLatest(PolicyTypes.GET_POLICY_BY_ID, getPolicyById, api),
    takeLatest(PolicyTypes.UPDATE_POLICY, updatePolicy, api),
    takeLatest(PolicyTypes.CREATE_POLICY, createPolicy, api)
  ]);
}
