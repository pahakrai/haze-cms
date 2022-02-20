import { all, put, takeLatest, call } from 'redux-saga/effects';
import { UserGroupPolicyTypes, UserGroupPolicyActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import ResourceActions from '../Resources/actions';
import { handleResponse } from '../utils/saga';

// export const getUserGroupPolicys = handlePaginate('userGroupPolicys', {
//   call: function*(api, { opts = {} }, paginate) {
//     const { offset = 0, limit } = paginate;
//     const state = yield select(state => state);
//     return yield call(
//       api.getUserGroupPolicys,
//       appendQueryWorkspace(state, {
//         offset,
//         limit,
//         paginate: true,
//         sort: '-createdAt',
//         ...opts
//       })
//     );
//   },
//   onSuccess: function*(data, paginate) {
//     const { entities, result } = yield normalize(data, [
//       Schemas.userGroupPolicySchema
//     ]);
//     yield put(ResourceActions.addEntities(entities));
//     if (paginate.append) {
//       yield put(UserGroupPolicyActions.mergeResults(result));
//     } else {
//       yield put(UserGroupPolicyActions.setResults(result));
//     }
//   },
//   onFailed: function*(data) {}
// });

export function* getUserGroupPolicys(api, { opts }) {
  const response = yield call(api.getUserGroupPolicys, opts);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.userGroupPolicySchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(UserGroupPolicyActions.setResults(result));
  }
  function* onFailed(data) {}
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getUserGroupPolicyByCode(api, { code }) {
  const response = yield call(api.getUserGroupPolicyByCode, code);
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.userGroupPolicySchema);
    yield put(ResourceActions.addEntities(entities));
  }
  function* onFailed(data) {}
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(
      UserGroupPolicyTypes.GET_USER_GROUP_POLICYS,
      getUserGroupPolicys,
      api
    ),
    takeLatest(
      UserGroupPolicyTypes.GET_USER_GROUP_POLICY_BY_CODE,
      getUserGroupPolicyByCode,
      api
    )
  ]);
}
