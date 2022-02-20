import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { UserGroupTypes, UserGroupActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
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
import { AccountActions } from '../Account/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export function* createUserGroup(api, { form, files, tags }) {
  const formName = Form.USER_GROUP_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createUserGroup, form);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.userGroupSchema]);
    yield put(ResourceActions.addEntities(entities));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export const getUserGroups = handlePaginate('userGroups', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getUserGroups,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts,
        page: query.page || 1
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.userGroupSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(UserGroupActions.mergeResults(result));
    } else {
      yield put(UserGroupActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetInvoicesErrors(data));
  }
});

export function* getUserGroupById(api, { id }) {
  const response = yield call(api.getUserGroupById, id, {
    populates: ['policies']
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.userGroupSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetInvoicesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deleteUserGroupById(api, { id }) {
  const response = yield call(api.deleteUserGroup, id);
  function* onSuccess(data) {
    yield put(UserGroupActions.getUserGroups({ refresh: true }));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetInvoicesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateUserGroup(api, { form, files }) {
  const formName = Form.USER_GROUP_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateUserGroup, form._id, form);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
    // Refresh Login User
    const currentUserId = yield select(state => state.app.userId);
    if (
      form.users &&
      form.users.length &&
      form.users.indexOf(currentUserId) !== -1
    )
      yield put(AccountActions.getAccountUser());
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(UserGroupTypes.GET_USER_GROUPS, getUserGroups, api),
    takeLatest(UserGroupTypes.UPDATE_USER_GROUP, updateUserGroup, api),
    takeLatest(UserGroupTypes.CREATE_USER_GROUP, createUserGroup, api),
    takeLatest(
      UserGroupTypes.DELETE_USER_GROUP_BY_ID,
      deleteUserGroupById,
      api
    ),
    takeLatest(UserGroupTypes.GET_USER_GROUP_BY_ID, getUserGroupById, api)
  ]);
}
