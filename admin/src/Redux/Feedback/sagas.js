import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { FeedbackTypes, FeedbackActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import { handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getFeedbacks = handlePaginate('feedbacks', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    yield put(LoadingActions.setLoading('getFeedbacks', true));
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getFeedbacks,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: ['client', ...(query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.feedbackSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(FeedbackActions.mergeResults(result));
    } else {
      yield put(FeedbackActions.setResults(result));
    }
    yield put(LoadingActions.setLoading('getFeedbacks', false));
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetFeedbacksErrors(data));
    yield put(FeedbackActions.setResults([]));
    yield put(LoadingActions.setLoading('getFeedbacks', false));
  }
});

export function* getFeedbackById(api, { id, query = {} }) {
  const response = yield call(api.getFeedbackById, id, {
    ...query,
    populates: []
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.feedbackSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetFeedbacksErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(FeedbackTypes.GET_FEEDBACKS, getFeedbacks, api),
    takeLatest(FeedbackTypes.GET_FEEDBACK_BY_ID, getFeedbackById, api)
  ]);
}
