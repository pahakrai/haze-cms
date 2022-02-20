import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  WorkspaceSubscriptionPlanActions,
  WorkspaceSubscriptionPlanTypes
} from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';

export function* getAllWorkspaceSubscriptionPlans(api, query) {
  const response = yield call(api.getAllWorkspaceSubscriptionPlans, {
    ...query,
    populates: ['$items.item']
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.workspaceSubscriptionPlanSchema
    ]);
    yield put(WorkspaceSubscriptionPlanActions.setAllResults(result));

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetWorkspaceSubscriptionPlansErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export default function* roots(api) {
  yield all([
    takeLatest(
      WorkspaceSubscriptionPlanTypes.GET_ALL_WORKSPACE_SUBSCRIPTION_PLANS,
      getAllWorkspaceSubscriptionPlans,
      api
    )
  ]);
}
