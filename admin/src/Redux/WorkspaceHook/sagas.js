import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeEvery
} from 'redux-saga/effects';

import { WorkspaceHookActions, WorkspaceHookTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getWorkspaceHooks = handlePaginate('workspaceHooks', {
  call: function* (api, { opts: { q } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    // query parse
    const apiQuery = {
      ...appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        localize: true,
        ...q
      })
    };

    return yield call(api.getWorkspaceHooks, apiQuery);
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.workspaceHookSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(WorkspaceHookActions.mergeResults(result));
    } else {
      yield put(WorkspaceHookActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetUsersErrors(data));
  }
});

export function* getWorkspaceHookById(api, { id }) {
  const response = yield call(api.getWorkspaceByHookId, id, {});
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.workspaceHookSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceHooksErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getWorkspaceHookByCode(api, { code }) {
  const response = yield call(api.getWorkspaceHookByCode, code);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.workspaceHookSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceHooksErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* searchWorkspaceHooks(api, { q, query }) {
  const response = yield call(api.searchWorkspaceHooks, { q, query });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.workspaceHookSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(WorkspaceHookActions.setSearchResults(result));
    yield put(WorkspaceHookActions.mergeAllResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceHooksErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getAllWorkspaceHooks(api, { query, refresh }) {
  const response = yield call(api.getAllWorkspaceHooks, query);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.workspaceHookSchema
    ]);
    yield put(WorkspaceHookActions.setAllResults(result));

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceHooksErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export default function* roots(api) {
  yield all([
    takeLatest(WorkspaceHookTypes.GET_WORKSPACE_HOOKS, getWorkspaceHooks, api),
    takeLatest(
      WorkspaceHookTypes.GET_ALL_WORKSPACE_HOOKS,
      getAllWorkspaceHooks,
      api
    ),
    takeLatest(
      WorkspaceHookTypes.GET_WORKSPACE_HOOK_BY_ID,
      getWorkspaceHookById,
      api
    ),
    takeLatest(
      WorkspaceHookTypes.SEARCH_WORKSPACE_HOOKS,
      searchWorkspaceHooks,
      api
    ),
    takeEvery(
      WorkspaceHookTypes.GET_WORKSPACE_HOOK_BY_CODE,
      getWorkspaceHookByCode,
      api
    )
  ]);
}
