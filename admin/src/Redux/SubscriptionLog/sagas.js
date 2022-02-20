import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { SubscriptionLogTypes, SubscriptionLogActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { LoadingActions } from '../../Redux/Loading/actions';

export let getSubscriptionLogs = handlePaginate('subscriptionLogs', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    yield put(LoadingActions.setLoading('getSubscriptionLogs', true));
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getSubscriptionLogs,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: [...(query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.subscriptionLogSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(SubscriptionLogActions.mergeResults(result));
    } else {
      yield put(SubscriptionLogActions.setResults(result));
    }
    yield put(LoadingActions.setLoading('getSubscriptionLogs', false));
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetFeedbacksErrors(data));
    yield put(SubscriptionLogActions.setResults([]));
    yield put(LoadingActions.setLoading('getSubscriptionLogs', false));
  }
});

export default function* roots(api) {
  yield all([
    takeLatest(
      SubscriptionLogTypes.GET_SUBSCRIPTION_LOGS,
      getSubscriptionLogs,
      api
    )
  ]);
}
