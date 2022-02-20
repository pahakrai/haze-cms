import {
  all,
  put,
  takeLatest,
  call,
  select,
  takeEvery
} from 'redux-saga/effects';

import { EmployeeTypes, EmployeeActions } from './actions';
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
import { LoadingActions } from '../Loading/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getEmployees = handlePaginate('employees', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getEmployees,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts.query
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.employeeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(EmployeeActions.mergeResults(result));
    } else {
      yield put(EmployeeActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetEmployeesErrors(data));
    yield put(EmployeeActions.setResults([]));
  }
});

export function* getEmployee(api, { opts = { query: {} } }) {
  const { onSuccess: onSuccessCall, onFailed: onFailedCall } = opts;
  const state = yield select(state => state);
  const response = yield call(
    api.getEmployees,
    appendQueryWorkspace(state, {
      sort: '-createdAt',
      ...opts.query
    })
  );

  function* onSuccess(data) {
    if (onSuccessCall) onSuccessCall(data);
    const { entities, result } = yield normalize(data, [
      Schemas.employeeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));

    yield put(EmployeeActions.setResults(result));
  }
  function* onFailed(data) {
    if (onFailedCall) yield onFailedCall(data);
    yield put(ErrorActions.setGetEmployeesErrors(data));
    yield put(EmployeeActions.setResults([]));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getEmployeeById(api, { id }) {
  yield put(LoadingActions.setLoading('getEmployeeById', true));
  const response = yield call(api.getEmployeeById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.employeeSchema
    );

    yield put(ResourceActions.addEntities(entities));
    yield put(LoadingActions.setLoading('getEmployeeById', false));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetEmployeesErrors(data));
    yield put(LoadingActions.setLoading('getEmployeeById', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getEmployeeByUserId(api, { userId }) {
  const response = yield call(api.getEmployeeByUserId, userId);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.employeeSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetEmployeesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* searchEmployees(api, { opts }) {
  const state = yield select(state => state);
  const response = yield call(
    api.getEmployees,
    appendQueryWorkspace(state, {
      ...opts
    })
  );
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.employeeSchema
    ]);

    yield put(EmployeeActions.setSearchResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetEmployeesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createEmployee(api, { formValues }) {
  const formName = Form.EMPLOYEE_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createEmployee, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.employeeSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(EmployeeActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateEmployee(api, { formValues }) {
  const formName = Form.EMPLOYEE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateEmployee, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.employeeSchema]);
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
    takeLatest(EmployeeTypes.GET_EMPLOYEE, getEmployee, api),
    takeLatest(EmployeeTypes.GET_EMPLOYEES, getEmployees, api),
    takeEvery(EmployeeTypes.GET_EMPLOYEE_BY_ID, getEmployeeById, api),
    takeEvery(EmployeeTypes.GET_EMPLOYEE_BY_USER_ID, getEmployeeByUserId, api),
    takeLatest(EmployeeTypes.UPDATE_EMPLOYEE, updateEmployee, api),
    takeLatest(EmployeeTypes.CREATE_EMPLOYEE, createEmployee, api),
    takeLatest(EmployeeTypes.SEARCH_EMPLOYEES, searchEmployees, api)
  ]);
}
