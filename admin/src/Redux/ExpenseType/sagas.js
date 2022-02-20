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
import { ExpenseTypeActions, ExpenseTypeTypes } from './actions';

export let getExpenseTypes = handlePaginate('expenseTypes', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    return yield call(api.getExpenseTypes, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...query,
      populates: [...(query.populates || [])]
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.expenseTypeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(ExpenseTypeActions.mergeResults(result));
    } else {
      yield put(ExpenseTypeActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetExpenseTypesErrors(data));
    yield put(ExpenseTypeActions.setResults([]));
  }
});

export function* getAllExpenseTypes(api) {
  const response = yield call(api.getExpenseTypes);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.expenseTypeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ExpenseTypeActions.setAllResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetExpenseTypesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* createExpenseType(api, { expenseType }) {
  yield put(startSubmit(Form.EXPENSE_TYPE_CREATE));

  const state = yield select(state => state);
  const { workspace } = appendQueryWorkspace(state, {});
  const response = yield call(api.createExpenseType, {
    ...expenseType,
    workspace: workspace
  });

  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.expenseTypeSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ExpenseTypeActions.setCreated(data._id));
    yield put(ExpenseTypeActions.setSelected(data._id));
    yield put(setSubmitSucceeded(Form.EXPENSE_TYPE_CREATE));
    yield put(stopSubmit(Form.EXPENSE_TYPE_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.EXPENSE_TYPE_CREATE));
    yield put(
      stopSubmit(Form.EXPENSE_TYPE_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateExpenseType(api, { id, expenseType }) {
  yield put(startSubmit(Form.EXPENSE_TYPE_UPDATE));
  const response = yield call(api.updateExpenseType, id, expenseType);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.EXPENSE_TYPE_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.EXPENSE_TYPE_UPDATE));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.EXPENSE_TYPE_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getExpenseTypeById(api, { id }) {
  const response = yield call(api.getExpenseTypeById, id, {});
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.expenseTypeSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetExpenseTypesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeEvery(ExpenseTypeTypes.GET_EXPENSE_TYPES, getExpenseTypes, api),
    takeEvery(ExpenseTypeTypes.GET_ALL_EXPENSE_TYPES, getAllExpenseTypes, api),
    takeLatest(ExpenseTypeTypes.CREATE_EXPENSE_TYPE, createExpenseType, api),
    takeLatest(ExpenseTypeTypes.UPDATE_EXPENSE_TYPE, updateExpenseType, api),
    takeLatest(ExpenseTypeTypes.GET_EXPENSE_TYPE_BY_ID, getExpenseTypeById, api)
  ]);
}
