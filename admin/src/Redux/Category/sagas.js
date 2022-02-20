import React from 'react';
import { FormattedMessage } from 'react-intl';
import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { toast } from '../../Lib/Toast';

import { entities as Schemas } from '../../Services/Schemas';

import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import { getErrorFromResponse } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import Form from '../../Constants/Form';

import { CategoryActions, CategoryTypes } from './actions';

export function* getCategories(api, { query = {} }) {
  yield put(CategoryActions.setResults([]));
  const state = yield select(state => state);
  const { workspace } = appendQueryWorkspace(state, query);
  const response = yield call(api.getCategories, {
    q: query.name,
    workspaces: workspace
  });

  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.categorySchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(CategoryActions.setResults(result));
    query.parent !== undefined &&
      (yield put(ResourceActions.addCategorys(entities, query.parent, result)));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCategorysErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getAllCategoriesWithChildren(api) {
  yield put(CategoryActions.setCategoriesWithChildrenResult([]));
  const response = yield call(api.getAllWithChildren);

  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.categorySchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(CategoryActions.setCategoriesWithChildrenResult(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCategorysErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getCategoryById(api, { id }) {
  const response = yield call(api.getCategoryById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.categorySchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCategorysErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createCategory(api, { formValues, files }) {
  const toastId = toast.info(
    <span>
      <FormattedMessage id="uploading" />
      ...0%
    </span>,
    { autoClose: false }
  );
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: (
        <span>
          <FormattedMessage id="uploading" />
          ...{progress.toFixed(2)}%
        </span>
      )
    });
  };
  const formName = Form.CATEGORY_CREATE;
  yield put(startSubmit(formName));
  const state = yield select(state => state);
  const { workspace } = appendQueryWorkspace(state, {});
  const response = yield call(
    api.createCategory,
    {
      ...formValues,
      workspace: workspace
    },
    files,
    onUploadProgress
  );

  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    // const { entities } = yield normalize([data], [Schemas.categorySchema]);
    // yield put(ResourceActions.addEntities(entities));
    yield put(CategoryActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateCategory(api, { id, category, files }) {
  const formName = Form.CATEGORY_UPDATE;
  const toastId = toast.info(
    <span>
      <FormattedMessage id="uploading" />
      ...0%
    </span>,
    { autoClose: false }
  );
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: (
        <span>
          <FormattedMessage id="uploading" />
          ...{progress.toFixed(2)}%
        </span>
      )
    });
  };

  yield put(startSubmit(formName));
  const response = yield call(
    api.updateCategory,
    id,
    category,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    // const { entities } = yield normalize([data], [Schemas.categorySchema]);
    // yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deleteCategory(api, { id }) {
  yield LoadingActions.setLoading('deleteCategory', true);
  const response = yield call(api.deleteCategory, id);
  function* onSuccess() {
    const allResults = yield select(state => state.category.allResults);

    yield put(CategoryActions.setAllResults(allResults.filter(v => v !== id)));
    toast.success(<FormattedMessage id="msg.delete_successful" />);
  }

  function onFailed(data) {
    toast.error(data.message);
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield LoadingActions.setLoading('deleteCategory', false);
}

export function* getAllCategory(api, { query: _query, refresh }) {
  const state = yield select(state => state);
  const query = appendQueryWorkspace(state, _query);
  const response = yield call(api.getCategories, {
    ...query,
    workspaces: query.workspace
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.categorySchema
    ]);
    if (refresh) {
      yield put(CategoryActions.setAllResults(result));
    } else {
      yield put(CategoryActions.mergeAllResults(result));
    }

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCategorysErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getAllDistrict(api, { query, refresh }) {
  const response = yield call(api.getAllDistrict, query);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.categorySchema
    ]);
    yield put(CategoryActions.setAllDistrict(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCategorysErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(CategoryTypes.GET_CATEGORIES, getCategories, api),
    takeLatest(
      CategoryTypes.GET_ALL_CATEGORIES_WITH_CHILDREN,
      getAllCategoriesWithChildren,
      api
    ),
    takeLatest(CategoryTypes.CREATE_CATEGORY, createCategory, api),
    takeLatest(CategoryTypes.UPDATE_CATEGORY, updateCategory, api),
    takeLatest(CategoryTypes.DELETE_CATEGORY, deleteCategory, api),
    takeLatest(CategoryTypes.GET_ALL_CATEGORY, getAllCategory, api),
    takeLatest(CategoryTypes.GET_ALL_DISTRICT, getAllDistrict, api),
    takeLatest(CategoryTypes.GET_CATEGORY_BY_ID, getCategoryById, api)
  ]);
}
