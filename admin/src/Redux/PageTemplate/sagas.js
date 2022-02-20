import {
  all,
  put,
  takeEvery,
  takeLatest,
  call,
  select
} from 'redux-saga/effects';

import { PageTemplateTypes, PageTemplateActions } from './actions';
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

export const getPageTemplates = handlePaginate('pageTemplates', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getPageTemplates,
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
      Schemas.pageTemplateSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PageTemplateActions.mergeResults(result));
    } else {
      yield put(PageTemplateActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPageTemplatesErrors(data));
    yield put(PageTemplateActions.setResults([]));
  }
});

// export function* getPageTemplates(api, { opts = { query: {} } }) {
//   const state = yield select(state => state);
//   const response = yield call(
//     api.getPageTemplates,
//     appendQueryWorkspace(state, {
//       sort: '-createdAt',
//       ...opts.query
//     })
//   );
//   function* onSuccess(data) {
//     const { entities, result } = yield normalize(data, [
//       Schemas.pageTemplateSchema
//     ]);
//     yield put(ResourceActions.addEntities(entities));
//     yield put(PageTemplateActions.setResults(result));
//   }

//   function* onFailed(data) {
//     yield put(ErrorActions.setGetPageTemplatesErrors(data));
//   }
//   yield handleResponse(response)(onSuccess, onFailed);
// }

export function* getPageTemplateById(api, { id, opts }) {
  const response = yield call(api.getPageTemplateById, id, opts);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.pageTemplateSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPageTemplatesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPageTemplate(api, { formValues, files }) {
  const formName = Form.PAGE_TEMPLATE_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createPageTemplate, formValues, files);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.pageTemplateSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(PageTemplateActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updatePageTemplate(api, { formValues, files }) {
  const formName = Form.PAGE_TEMPLATE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updatePageTemplate, formValues, files);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.pageTemplateSchema]);
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
    takeEvery(PageTemplateTypes.GET_PAGE_TEMPLATES, getPageTemplates, api),
    takeLatest(
      PageTemplateTypes.GET_PAGE_TEMPLATE_BY_ID,
      getPageTemplateById,
      api
    ),
    takeLatest(PageTemplateTypes.UPDATE_PAGE_TEMPLATE, updatePageTemplate, api),
    takeLatest(PageTemplateTypes.CREATE_PAGE_TEMPLATE, createPageTemplate, api)
  ]);
}
