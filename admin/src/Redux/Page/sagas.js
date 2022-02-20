import React from 'react';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';

import { toast } from '../../Lib/Toast';
import { entities as Schemas } from '../../Services/Schemas';
import Form from '../../Constants/Form';

import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';

import {
  handleResponse,
  getErrorFromResponse,
  handlePaginate
} from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

import { PageTypes, PageActions } from './actions';

export let getPages = handlePaginate('pages', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getPages,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.pageSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PageActions.mergeResults(result));
    } else {
      yield put(PageActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPagesErrors(data));
    yield put(PageActions.setResults([]));
  }
});

export function* getPageById(api, { id }) {
  const response = yield call(api.getPageById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.pageSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPagesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPage(api, { formValues }) {
  const formName = Form.PAGE_CREATE;
  yield put(startSubmit(formName));
  const state = yield select(state => state);
  const response = yield call(
    api.createPage,
    appendQueryWorkspace(state, { ...formValues })
  );
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.pageSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(PageActions.setSelected(data._id));
    yield put(stopSubmit(formName));
    toast.success(<FormattedMessage id={'created_successfully'} />);
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updatePage(api, { formValues }) {
  const formName = Form.PAGE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updatePage, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.pageSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
    toast.success(<FormattedMessage id={'updated_successfully'} />);
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* updatePageNotForm(api, { formValues, callback }) {
  const response = yield call(api.updatePage, formValues);
  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.pageSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (callback && callback.success) callback.success();
    // AntMessage.success(<FormattedMessage id={'updated_successfully'} />);
  }

  function* onFailed(data) {
    if (callback && callback.fail) yield callback.fail();
    // yield AntMessage.error(<FormattedMessage id={'updated_failure'} />);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* searchSelectPageTemplates(api, { opts }) {
  yield put(LoadingActions.setLoading('searchSelectPageTemplates', true));
  const response = yield call(api.getPages, opts);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.pageSchema]);
    yield put(PageActions.setSearchResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPagesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('searchSelectPageTemplates', false));
}

export function* getPageTemplates(api, { opts }) {
  yield put(LoadingActions.setLoading('getPageTemplates', true));
  const response = yield call(api.getTemplateWhenCreatePage, opts);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.pageSchema]);
    yield put(PageActions.setSearchResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPagesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getPageTemplates', false));
}

export default function* roots(api) {
  yield all([
    takeLatest(PageTypes.GET_PAGES, getPages, api),
    takeLatest(PageTypes.GET_PAGE_BY_ID, getPageById, api),
    takeLatest(PageTypes.UPDATE_PAGE, updatePage, api),
    takeLatest(PageTypes.UPDATE_PAGE_NOT_FORM, updatePageNotForm, api),
    takeLatest(PageTypes.CREATE_PAGE, createPage, api),
    takeLatest(PageTypes.GET_PAGE_TEMPLATES, getPageTemplates, api),
    takeLatest(
      PageTypes.SEARCH_SELECT_PAGE_TEMPLATES,
      searchSelectPageTemplates,
      api
    )
  ]);
}
