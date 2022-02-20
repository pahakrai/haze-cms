import {
  all,
  put,
  takeLatest,
  takeEvery,
  call,
  select
} from 'redux-saga/effects';

import { ClaimTypes, ClaimActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { toast } from '../../Lib/Toast';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getClaims = handlePaginate('claims', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getClaims,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-date',
        ...opts.query,
        populates: ['payee', ...(opts.query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.claimSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(ClaimActions.mergeResults(result));
    } else {
      yield put(ClaimActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetClaimsErrors(data));
    yield put(ClaimActions.setResults([]));
  }
});

export function* getClaimById(api, { id, query }) {
  const response = yield call(api.getClaimById, id, query);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.claimSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetClaimsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createClaim(api, { formValues }) {
  const formName = Form.CLAIM_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createClaim, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.claimSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ClaimActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateClaim(api, { formValues }) {
  const formName = Form.CLAIM_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateClaim, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.claimSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* approveClaim(api, { id }) {
  yield put(LoadingActions.setLoading('approveClaim', true));
  const response = yield call(api.approveClaim, id);
  function* onSuccess(data) {
    yield put(
      ClaimActions.getClaimById(id, { populates: ['expenses', 'employee'] })
    );
    yield put(LoadingActions.setLoading('approveClaim', false));
    toast.success('Approve Successful Send Email');
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetExpensesErrors(data));
    yield put(LoadingActions.setLoading('approveClaim', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* rejectClaim(api, { id, formValues }) {
  yield put(LoadingActions.setLoading('rejectClaim', true));
  const response = yield call(api.rejectClaim, id, formValues);
  function* onSuccess(data) {
    yield put(
      ClaimActions.getClaimById(id, { populates: ['expenses', 'employee'] })
    );
    yield put(LoadingActions.setLoading('rejectClaim', false));
    toast.success('Reject Claim Success Send Email');
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetExpensesErrors(data));
    yield put(LoadingActions.setLoading('rejectClaim', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* appealClaim(api, { id }) {
  yield put(LoadingActions.setLoading('appealClaim', true));
  const response = yield call(api.appealClaim, id);
  function* onSuccess(data) {
    yield put(
      ClaimActions.getClaimById(id, { populates: ['expenses', 'employee'] })
    );
    yield put(LoadingActions.setLoading('appealClaim', false));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetExpensesErrors(data));
    yield put(LoadingActions.setLoading('appealClaim', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getExamineClaim(api, { id, examine }) {
  yield put(LoadingActions.setLoading('getExamineClaim', true));
  const response = yield call(api.getExamineClaim, id, examine);
  function* onSuccess(data) {
    yield put(ClaimActions.getClaimById(id));
    yield put(LoadingActions.setLoading('getExamineClaim', false));
    toast.success('Mail has been sent to Administrator');
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetExpensesErrors(data));
    yield put(LoadingActions.setLoading('getExamineClaim', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deleteExpense(api, { claimId, expenseId }) {
  const response = yield call(api.deleteExpense, claimId, expenseId);
  function* onSuccess(data) {
    // toast.success('Delete success');
    // yield put(
    //   ClaimActions.getClaimById(claimId, {
    //     populates: ['expenses', 'employee']
    //   })
    // );
  }

  function* onFailed(data) {
    yield put(ErrorActions.setDeletePostErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeEvery(ClaimTypes.GET_CLAIMS, getClaims, api),
    takeLatest(ClaimTypes.DELETE_EXPENSE, deleteExpense, api),
    takeLatest(ClaimTypes.GET_EXAMINE_CLAIM, getExamineClaim, api),
    takeLatest(ClaimTypes.APPROVE_CLAIM, approveClaim, api),
    takeLatest(ClaimTypes.REJECT_CLAIM, rejectClaim, api),
    takeLatest(ClaimTypes.APPEAL_CLAIM, appealClaim, api),
    takeLatest(ClaimTypes.GET_CLAIM_BY_ID, getClaimById, api),
    takeLatest(ClaimTypes.UPDATE_CLAIM, updateClaim, api),
    takeLatest(ClaimTypes.CREATE_CLAIM, createClaim, api)
  ]);
}
