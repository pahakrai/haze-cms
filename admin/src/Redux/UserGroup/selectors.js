import { createSelector } from 'reselect';

export const getUserGroups = createSelector(
  state => state.resources.userGroups,
  state => state.userGroup.results,
  (userGroups, ids) =>
    ids && Array.isArray(ids) && ids.map(id => userGroups[id])
);

export const getUserGroupById = createSelector(
  state => state.resources.userGroups,
  (state, userGroupId) => userGroupId,
  (userGroups, id) => userGroups[id]
);

export default {
  getUserGroups,
  getUserGroupById
};
