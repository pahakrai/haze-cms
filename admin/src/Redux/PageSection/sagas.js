import {
  all,
  put,
  takeEvery,
  takeLatest,
  call,
  select
} from 'redux-saga/effects';

import { PageSectionTypes, PageSectionActions } from './actions';
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

export const getPageSection = handlePaginate('pageSection', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getPageSection,
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
      Schemas.pageSectionSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PageSectionActions.mergeResults(result));
    } else {
      yield put(PageSectionActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPageTemplatesErrors(data));
    yield put(PageSectionActions.setResults([]));
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

export function* getPageSectionById(api, { id, opts }) {
  const response = yield call(api.getPageSectionById, id, opts);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.pageSectionSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPageSectionErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPageSection(api, { formValues, files }) {
  const formName = Form.PAGE_SECTION_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createPageSection, formValues, files);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.pageSectioneSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(PageSectionActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updatePageSection(api, { formValues, files }) {
  const formName = Form.PAGE_SECTION_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updatePageSection, formValues, files);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.pageSectionSchema]);
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
    takeEvery(PageSectionTypes.GET_PAGE_SECTION, getPageSection, api),
    takeLatest(
      PageSectionTypes.GET_PAGE_SECTION_BY_ID,
      getPageSectionById,
      api
    ),
    takeLatest(PageSectionTypes.UPDATE_PAGE_SECTION, updatePageSection, api),
    takeLatest(PageSectionTypes.CREATE_PAGE_SECTION, createPageSection, api)
  ]);
}
