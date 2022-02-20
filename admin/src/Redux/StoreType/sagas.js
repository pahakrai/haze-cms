import {
  all,
  takeLatest,
  takeEvery,
  call,
  put,
  select
} from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';

import { handleResponse, handlePaginate } from '../utils/saga';
import { getErrorFromResponse } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import Form from '../../Constants/Form';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { entities as Schemas } from '../../Services/Schemas';
import { StoreTypeActions, StoreTypes } from './actions';

export let getStoreTypes = handlePaginate('storeTypes', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getStoreTypes,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-date',
        ...opts.query
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.storeTypeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(StoreTypeActions.mergeResults(result));
    } else {
      yield put(StoreTypeActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetStoreTypesErrors(data));
    yield put(StoreTypeActions.setResults([]));
  }
});

export function* getAllStoreTypes(api) {
  const response = yield call(api.getStoreTypes);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.storeTypeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(StoreTypeActions.setAllResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetStoreTypesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* createStoreType(api, { storeType }) {
  yield put(startSubmit(Form.STORE_TYPE_CREATE));

  const state = yield select(state => state);
  const { workspace } = appendQueryWorkspace(state, {});
  const response = yield call(api.createStoreType, {
    ...storeType,
    workspace: workspace
  });

  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.storeTypeSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(StoreTypeActions.setCreated(data._id));
    yield put(StoreTypeActions.setSelected(data._id));
    yield put(setSubmitSucceeded(Form.STORE_TYPE_CREATE));
    yield put(stopSubmit(Form.STORE_TYPE_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.STORE_TYPE_CREATE));
    yield put(
      stopSubmit(Form.STORE_TYPE_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateStoreType(api, { id, storeType }) {
  yield put(startSubmit(Form.STORE_TYPE_UPDATE));
  const response = yield call(api.updateStoreType, id, storeType);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.STORE_TYPE_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.STORE_TYPE_UPDATE));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.STORE_TYPE_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getStoreTypeById(api, { id }) {
  const response = yield call(api.getStoreTypeById, id, {});
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.storeTypeSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetStoreTypesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeEvery(StoreTypes.GET_STORE_TYPES, getStoreTypes, api),
    takeEvery(StoreTypes.GET_ALL_STORE_TYPES, getAllStoreTypes, api),
    takeLatest(StoreTypes.CREATE_STORE_TYPE, createStoreType, api),
    takeLatest(StoreTypes.UPDATE_STORE_TYPE, updateStoreType, api),
    takeLatest(StoreTypes.GET_STORE_TYPE_BY_ID, getStoreTypeById, api)
  ]);
}
