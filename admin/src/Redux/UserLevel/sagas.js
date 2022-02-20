import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { entities as Schemas } from '../../Services/Schemas';
import { handleResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';

import { UserLevelActions, UserLevelTypes } from './actions';

export let getUserLevels = handlePaginate('userLevels', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const state = yield select(state => state);
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    if (query.isActive === '') query.isActive = undefined;
    if (query.userType === '') query.userType = undefined;
    return yield call(
      api.getUserLevels,
      appendQueryWorkspace(state, {
        offset,
        limit,
        localize: true,
        paginate: true,
        sort: '-createdAt',
        ...query
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.userLevelSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(UserLevelActions.mergeResults(result));
    } else {
      yield put(UserLevelActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
});

export function* getUserLevelById(api, { id }) {
  const response = yield call(api.getUserLevelById, id);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.userLevelSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateUserLevel(api, { formValues }) {
  const formName = Form.USER_LEVEL_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateUserLevel, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.userLevelSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createUserLevel(api, { formValues }) {
  const formName = Form.USER_LEVEL_CREATE;
  yield put(startSubmit(formName));
  const state = yield select(state => state);
  const response = yield call(
    api.createUserLevel,
    appendQueryWorkspace(state, { ...formValues })
  );

  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.userLevelSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.USER_LEVEL_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(UserLevelTypes.GET_USER_LEVELS, getUserLevels, api),
    takeLatest(UserLevelTypes.GET_USER_LEVEL_BY_ID, getUserLevelById, api),
    takeLatest(UserLevelTypes.UPDATE_USER_LEVEL, updateUserLevel, api),
    takeLatest(UserLevelTypes.CREATE_USER_LEVEL, createUserLevel, api)
  ]);
}
