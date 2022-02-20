import { all, takeLatest, call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { entities as Schemas } from '../../Services/Schemas';
import { TagRecommendationTypes, TagRecommendationActions } from './actions';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';

export function* getTagRecommendations(api, { query }) {
  const response = yield call(api.getTagRecommendations, query);
  function* onSuccess(data) {
    const { result, entities } = yield normalize(data, [
      Schemas.tagRecommendationSchema
    ]);
    yield put(TagRecommendationActions.setResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetTagRecommendations(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(
      TagRecommendationTypes.GET_TAG_RECOMMENDATIONS,
      getTagRecommendations,
      api
    )
  ]);
}
