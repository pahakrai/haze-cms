import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { handleResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { entities as Schemas } from '../../Services/Schemas';
import { TagTypes, TagActions } from './actions';
import { ErrorActions } from '../Error/actions';
import { LoadingActions } from '../Loading/actions';
import ResourceActions from '../Resources/actions';

export function* getTags(api, { opts = { filterValues: {} } }) {
  const query = opts && opts.query ? opts.query : {};
  if (query.q === null) query.q = '';
  yield put(LoadingActions.setLoading('getTags', true));
  const response = yield call(api.getTags, {
    ...query
  });
  function* onSuccess(data) {
    const { result, entities } = yield normalize(data, [Schemas.tagSchema]);
    yield put(TagActions.setResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetTagsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getTags', false));
}

export function* getAllDistinctTags(api) {
  yield put(LoadingActions.setLoading('getAllDistinctTags', true));
  const response = yield call(api.getDistinctTags);
  function* onSuccess(data) {
    yield put(TagActions.setAllDistinctResults(data));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetTagsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getAllDistinctTags', false));
}

export let getDistinctTags = handlePaginate('tags', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const query = opts && opts.query ? opts.query : {};
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getDistinctTags,
      appendQueryWorkspace(state, {
        offset,
        limit,
        page: query.page || 1,
        text: query.text
      })
    );
  },
  onSuccess: function* (data, paginate) {
    yield put(TagActions.setDistinctResults(data));
    // const { entities, result } = yield normalize(data, [Schemas.tagSchema]);
    // yield put(ResourceActions.addEntities(entities));
    // yield put(TagActions.setDistinctResults(result));
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetTagsErrors(data));
    yield put(TagActions.setDistinctResults([]));
  }
});

export function* getTagsByProductId(api, { productId }) {
  yield put(LoadingActions.setLoading('getTagsByProductId', true));
  yield put(TagActions.setResultsByProductId(null));
  const response = yield call(api.getTagsByProductId, productId);
  function* onSuccess(data) {
    const { result, entities } = yield normalize(data, [Schemas.tagSchema]);
    yield put(TagActions.setResultsByProductId(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetTagsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getTagsByProductId', false));
}
export function* getTagsByPostId(api, { postId }) {
  yield put(LoadingActions.setLoading('getTagsByPostId', true));
  yield put(TagActions.setResultsByPostId(null));
  const response = yield call(api.getTagsByPostId, postId);
  function* onSuccess(data) {
    const { result, entities } = yield normalize(data, [Schemas.tagSchema]);
    yield put(TagActions.setResultsByPostId(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetTagsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getTagsByPostId', false));
}

export function* getTagByText(api, { text }) {
  const response = yield call(api.getTagByText, text, {
    populates: ['tagImage', 'tagImage.image']
  });

  function* onSuccess(data) {
    yield put(TagActions.setTextResults(data));
    // const { entities } = yield normalize(data, Schemas.tagSchema);

    // yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetTagsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getTagById(api, { id }) {
  const response = yield call(api.getTagById, id);

  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.tagSchema);

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetTagsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(tagService) {
  yield all([
    takeLatest(TagTypes.GET_TAGS, getTags, tagService),
    takeLatest(TagTypes.GET_DISTINCT_TAGS, getDistinctTags, tagService),
    takeLatest(TagTypes.GET_ALL_DISTINCT_TAGS, getAllDistinctTags, tagService),
    takeLatest(TagTypes.GET_TAG_BY_ID, getTagById, tagService),
    takeLatest(TagTypes.GET_TAG_BY_TEXT, getTagByText, tagService),
    takeLatest(TagTypes.GET_TAGS_BY_PRODUCT_ID, getTagsByProductId, tagService),
    takeLatest(TagTypes.GET_TAGS_BY_POST_ID, getTagsByPostId, tagService)
  ]);
}
