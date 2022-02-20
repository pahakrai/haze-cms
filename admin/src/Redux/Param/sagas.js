import { all, takeEvery, call, put, takeLeading } from 'redux-saga/effects';
import { ParamActions, ParamTypes } from './actions';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';

import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import ResourceActions from '../Resources/actions';

export function* getParamAvatar(api) {
  const response = yield call(api.getParamAvatar);
  function* onSuccess(data) {
    yield put(ParamActions.setDefaultAvatar(data));
    yield put(ParamActions.setResult(data));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetUserTypeErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getParamMobileNavigation(api) {
  const response = yield call(api.getParamMobileURINavigation);
  function* onSuccess(data) {
    const parameters =
      (data && Array.isArray(data) && data.length && data[0].parameters) || [];
    const { entities, result } = yield normalize(parameters, [
      Schemas.paramMobileNavigationSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ParamActions.setNavigationsResult(result));
  }

  function* onFailed(data) {
    // yield put(ErrorActions.setGetUserTypeErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getEdmTemplates(api) {
  const response = yield call(api.getEdmTemplates);
  function* onSuccess(data) {
    if (data && Array.isArray(data) && data.length === 1) {
      yield put(ParamActions.setEdmTemplates(data[0]));
    } else {
      yield put(ParamActions.setEdmTemplates(data));
    }
  }

  function* onFailed(data) {
    // no do
    // yield put(ErrorActions.setGetTagsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getPreferenceLanguage(api) {
  const response = yield call(api.getPreferenceLanguage);
  function* onSuccess(data) {
    var languages =
      data && data[0] && Array.isArray(data[0].parameters)
        ? data[0].parameters
        : [];

    yield put(ParamActions.setLanguages(languages));
  }
  function onFailed(data, response) {}
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLeading(ParamTypes.GET_PARAM_AVATAR, getParamAvatar, api),
    takeEvery(
      ParamTypes.GET_PARAM_MOBILE_NAVIGATION,
      getParamMobileNavigation,
      api
    ),
    takeEvery(ParamTypes.GET_EDM_TEMPLATES, getEdmTemplates, api),
    takeEvery(ParamTypes.GET_PREFERENCE_LANGUAGE, getPreferenceLanguage, api)
  ]);
}
