import { all, takeLatest, call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import FollowerActions, { FollowerTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';

export function* getUserFollowCount(api, { userId }) {
  const response = yield call(api.getUserFollowCount, userId);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(
      [data],
      [Schemas.userFollowCountSchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(FollowerActions.setUserFollowCountIds(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetUserFollowCountErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* followerSagas(api) {
  yield all([
    takeLatest(FollowerTypes.GET_USER_FOLLOW_COUNT, getUserFollowCount, api)
  ]);
}
