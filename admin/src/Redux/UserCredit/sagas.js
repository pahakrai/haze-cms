import { all, put, takeLatest, call } from 'redux-saga/effects';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';

import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import { ErrorActions } from '../Error/actions';

import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { UserCreditTypes, UserCreditActions } from './actions';

export let getUserCredits = handlePaginate('userCredits', {
  call: function* (api, { querys = {}, opts }, paginate) {
    yield put(LoadingActions.setLoading('getUserCredits', true));
    yield put(UserCreditActions.setResults([]));
    const { offset, limit } = paginate;
    return yield call(api.getUserCredits, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      page: querys.page || 1,
      ...querys
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.userCreditSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(UserCreditActions.mergeResults(result));
    } else {
      yield put(UserCreditActions.setResults(result));
    }
    yield put(LoadingActions.setLoading('getUserCredits', false));
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetUserCreditsErrors(data));
    yield put(LoadingActions.setLoading('getUserCredits', false));
  }
});
export function* getUserCreditByUId(api, { uid, workspace }) {
  yield put(UserCreditActions.deleteCredit(uid));
  yield put(LoadingActions.setLoading('getCreditByUserAndWorkspace', true));
  const response = yield call(api.getUserCreditByUId, uid, workspace);
  function* onSuccess(data) {
    if (Object.prototype.toString.call(data) !== '[object Object]') {
      data = {};
    }
    // data
    const { entities } = yield normalize(data, Schemas.userCreditSchema);
    yield put(ResourceActions.addEntities(entities));
    yield put(UserCreditActions.setCredit(uid, data || { credit: 0 }));
    yield put(LoadingActions.setLoading('getCreditByUserAndWorkspace', false));
  }
  function* onFailed(data) {
    yield put(LoadingActions.setLoading('getCreditByUserAndWorkspace', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getUserAllCreditByUId(api, { uid }) {
  const response = yield call(api.getUserAllCreditByUId, uid);
  function* onSuccess(data) {
    yield put(
      UserCreditActions.setCredits(uid, Array.isArray(data) ? data : [])
    );
  }
  function* onFailed(data) {}
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createUserCredit(api, { form }) {
  const formName = Form.USER_CREDIT_TRANSACTIONS_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createUserCredit, form);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(
      [data],
      [Schemas.userCreditSchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(UserCreditActions.mergeResults(result));
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
      UserCreditTypes.GET_USER_ALL_CREDIT_BY_U_ID,
      getUserAllCreditByUId,
      api
    ),
    takeLatest(
      UserCreditTypes.GET_USER_CREDIT_BY_U_ID,
      getUserCreditByUId,
      api
    ),
    takeLatest(UserCreditTypes.GET_USER_CREDITS, getUserCredits, api),
    takeLatest(UserCreditTypes.CREATE_USER_CREDIT, createUserCredit, api)
  ]);
}
