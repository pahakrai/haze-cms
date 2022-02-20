import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { ExpenseTypes, ExpenseActions } from './actions';
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
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export function* createExpense(api, { expenseForm, files }) {
  yield put(startSubmit(Form.EXPENSE_CREATE));
  const state = yield select(state => state);
  const { workspace } = appendQueryWorkspace(state, {});
  const response = yield call(
    api.createExpense,
    {
      ...expenseForm,
      workspace: workspace
    },
    files
  );
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.EXPENSE_CREATE));
    const { entities } = yield normalize([data], [Schemas.expenseSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ExpenseActions.setSelected(data._id));

    yield put(stopSubmit(Form.EXPENSE_CREATE));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.EXPENSE_CREATE));
    yield put(
      stopSubmit(
        Form.EXPENSE_CREATE,
        getErrorFromResponse(Form.EXPENSE_CREATE, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export let getExpenses = handlePaginate('expenses', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;

    const state = yield select(state => state);
    return yield call(
      api.getExpenses,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        populates: ['expenseType', 'order', 'payer'],
        ...opts.query
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.expenseSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(ExpenseActions.mergeResults(result));
    } else {
      yield put(ExpenseActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetExpensesErrors(data));
  }
});

export function* getExpenseById(api, { id }) {
  const response = yield call(api.getExpenseById, id, {
    populates: ['expenseType', 'order']
  });
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.expenseSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetExpenseTypesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateExpense(api, { expenseForm, files }) {
  yield put(startSubmit(Form.EXPENSE_UPDATE));
  const response = yield call(api.updateExpense, expenseForm, files);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.EXPENSE_UPDATE));
    yield put(ResourceActions.updateExpense(data));
    yield put(stopSubmit(Form.EXPENSE_UPDATE));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.EXPENSE_UPDATE));
    yield put(
      stopSubmit(Form.EXPENSE, getErrorFromResponse(Form.EXPENSE, response))
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(ExpenseTypes.GET_EXPENSES, getExpenses, api),
    takeLatest(ExpenseTypes.UPDATE_EXPENSE, updateExpense, api),
    takeLatest(ExpenseTypes.CREATE_EXPENSE, createExpense, api),
    takeLatest(ExpenseTypes.GET_EXPENSE_BY_ID, getExpenseById, api)
  ]);
}
