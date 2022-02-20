import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
// import { toast } from '../../Lib/Toast';
// import { FormattedMessage } from 'react-intl';
import {
  WorkspaceSubscriptionInvoiceActions,
  WorkspaceSubscriptionInvoiceTypes
} from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';

import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { appendQueryWorkspace } from '../utils';

export let getWorkspaceSubscriptionInvoices = handlePaginate(
  'workspaceSubscriptionInvoices',
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
      const result = yield call(api.getWorkspaceSubscriptionInvoices, query);
      return result;
    },
    onSuccess: function* (data, paginate) {
      const { entities, result } = yield normalize(data, [
        Schemas.workspaceSubscriptionInvoiceSchema
      ]);
      yield put(ResourceActions.addEntities(entities));
      if (paginate.append) {
        yield put(WorkspaceSubscriptionInvoiceActions.mergeResults(result));
      } else {
        yield put(WorkspaceSubscriptionInvoiceActions.setResults(result));
      }
    },
    onFailed: function* (data) {
      yield put(ErrorActions.setGetWorkspaceSubscriptionInvoicesErrors(data));
    }
  }
);

export function* getWorkspaceSubscriptionInvoiceById(api, { id, query = {} }) {
  const response = yield call(api.getWorkspaceSubscriptionInvoiceById, id, {
    ...query,
    populates: [...(query.populates || [])]
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.workspaceSubscriptionInvoiceSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceSubscriptionInvoiceErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createWorkspaceSubscriptionInvoice(api, { formValues }) {
  yield put(WorkspaceSubscriptionInvoiceActions.setSelected(''));
  const formName = Form.WORKSPACE_SUBSCRIPTION_INVOICE_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(
    api.createWorkspaceSubscriptionInvoice,
    formValues
  );
  function* onSuccess(data) {
    yield put(WorkspaceSubscriptionInvoiceActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateWorkspaceSubscriptionInvoice(api, { formValues }) {
  const formName = Form.WORKSPACE_SUBSCRIPTION_INVOICE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(
    api.updateWorkspaceSubscriptionInvoice,
    formValues
  );
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

export default function* roots(api) {
  yield all([
    takeLatest(
      WorkspaceSubscriptionInvoiceTypes.GET_WORKSPACE_SUBSCRIPTION_INVOICES,
      getWorkspaceSubscriptionInvoices,
      api
    ),
    takeLatest(
      WorkspaceSubscriptionInvoiceTypes.GET_WORKSPACE_SUBSCRIPTION_INVOICE_BY_ID,
      getWorkspaceSubscriptionInvoiceById,
      api
    ),
    takeLatest(
      WorkspaceSubscriptionInvoiceTypes.CREATE_WORKSPACE_SUBSCRIPTION_INVOICE,
      createWorkspaceSubscriptionInvoice,
      api
    ),
    takeLatest(
      WorkspaceSubscriptionInvoiceTypes.UPDATE_WORKSPACE_SUBSCRIPTION_INVOICE,
      updateWorkspaceSubscriptionInvoice,
      api
    )
  ]);
}
