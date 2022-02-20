import {
  all,
  put,
  takeLatest,
  call,
  select,
  takeLeading
} from 'redux-saga/effects';

import { MemberTypes, MemberActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { LoadingActions } from '../Loading/actions';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getMembers = handlePaginate('members', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    yield put(LoadingActions.setLoading('memberList', true));
    const state = yield select(state => state);
    return yield call(
      api.getMembers,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        populates: ['user'],
        ...opts.query
      })
    );
  },
  onSuccess: function* (data, paginate) {
    yield put(LoadingActions.setLoading('memberList', false));
    const { entities, result } = yield normalize(data, [Schemas.memberSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(MemberActions.mergeResults(result));
    } else {
      yield put(MemberActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetMembersErrors(data));
    yield put(MemberActions.setResults([]));
    yield put(LoadingActions.setLoading('memberList', false));
  }
});

export function* getMemberById(api, { id }) {
  const response = yield call(api.getMemberById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.memberSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetMembersErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createMember(api, { formValues }) {
  const formName = Form.MEMBER_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createMember, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.memberSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(MemberActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateMember(api, { formValues }) {
  const formName = Form.MEMBER_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateMember, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.memberSchema]);
    yield put(ResourceActions.addEntities(entities));
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
    takeLeading(MemberTypes.GET_MEMBERS, getMembers, api),
    takeLatest(MemberTypes.GET_MEMBER_BY_ID, getMemberById, api),
    takeLatest(MemberTypes.UPDATE_MEMBER, updateMember, api),
    takeLatest(MemberTypes.CREATE_MEMBER, createMember, api)
  ]);
}
