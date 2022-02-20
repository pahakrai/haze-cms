import { put, select } from 'redux-saga/effects';
import PaginationActions from '../Pagination/actions';
import {
  getPaginationFetching,
  getPaginationOffset,
  getPaginationLimit,
  getPaginationIsEnd,
  getPagination
} from '../selectors';
export const handleResponse = (response = {}) =>
  function* (onSuccess, onFailed) {
    if (response.ok) {
      try {
        yield onSuccess(response.data, response);
      } catch (e) {
        yield onFailed(e);
      }
    } else {
      yield onFailed(response.data, response);
    }
  };

// Trigger loadingFn twice, once before and once after fn.
// Before state = state[0], after state = state[1]
export const stateWrap = (
  loadingFn,
  fn,
  /* istanbul ignore next */ states = [true, false]
) =>
  function* (...args) {
    yield put(loadingFn(states[0]));
    yield fn.apply(this, args);
    yield put(loadingFn(states[1]));
  };

export const handleLoading = (loadingFn, fn) =>
  stateWrap(loadingFn, fn, [true, false]);

export const getErrorFromResponse = (formName, res) => {
  const response = {
    ...res,
    status: res ? res.status || res.statusCode : undefined
  };
  let error = {};
  if (!response.status) {
    error = { _error: 'Server down' };
  } else if (response.status >= 400 && response.status < 500) {
    //client error
    const errorMessage =
      (response.data && response.data.message) || response.message;
    if (errorMessage instanceof Array) {
      const formError = {};
      errorMessage.forEach(item => {
        formError[item.field] = item.message;
      });
      error = formError;
    } else {
      error = { _error: errorMessage };
    }
  } else if (response.status >= 500) {
    //server error
    error = {
      _error: (response.data && response.data.message) || response.message
    };
  } else {
    error = { _error: 'Unknown error' };
  }
  return error;
};

export const handlePaginate = (paginationName, steps) =>
  function* (api, action) {
    let opts = Object.assign(
      {},
      {
        append: false,
        refresh: false
      },
      action.opts
    );
    const { append, refresh, resetLimit } = opts;
    const pagination = yield select(state => state.pagination[paginationName]);
    if (!pagination) {
      yield put(PaginationActions.resetGroup(paginationName));
    }

    const fetching = yield select(getPaginationFetching(paginationName));
    const isEnd = yield select(getPaginationIsEnd(paginationName));

    if (fetching || (append && isEnd)) {
      return;
    }
    if (refresh) {
      yield put(PaginationActions.resetGroup(paginationName));
    }

    if (resetLimit) {
      yield put(PaginationActions.setLimit(paginationName, resetLimit));
    }

    const paginateState = yield select(getPagination(paginationName));
    const offset = yield select(getPaginationOffset(paginationName));
    const limit = yield select(getPaginationLimit(paginationName));
    const newOffset = append ? offset + limit : offset;
    opts = { ...opts, offset: newOffset, limit, state: paginateState };
    yield put(PaginationActions.setFetching(paginationName, true));
    const response = yield steps.call(api, action, opts);
    function* onSuccess(data) {
      const { docs = [], ...rest } = data || {};
      yield steps.onSuccess(docs, opts, action);
      yield put(
        PaginationActions.setGroup(paginationName, {
          ...rest,
          fetching: false,
          refreshing: false
        })
      );
    }
    function* onFailed(data) {
      yield steps.onFailed(data, opts, action);
      yield put(PaginationActions.setFetching(paginationName, false));
    }
    yield handleResponse(response)(onSuccess, onFailed);
  };
