import { createSelector } from 'reselect';

export const getUserGroupPolicys = createSelector(
  state => state.resources.userGroupPolicys,
  state => state.userGroupPolicy.results,
  (userGroupPolicys, ids) =>
    ids &&
    Array.isArray(ids) &&
    ids.map(id => userGroupPolicys[id]).filter(v => v)
);

export const getUserGroupPolicyById = createSelector(
  state => state.resources.userGroupPolicys,
  (state, id) => id,
  (userGroupPolicys, id) => userGroupPolicys[id]
);

export default {
  getUserGroupPolicys,
  getUserGroupPolicyById
};
