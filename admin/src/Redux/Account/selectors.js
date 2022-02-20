import { createSelector } from 'reselect';

export const getCurrentUser = createSelector(
  state => state.resources.users,
  state => state.app.userId,
  (users, _id) => users && users[_id]
);

export const getCurrentUserId = createSelector(
  state => state.app.userId,
  _id => _id
);

export const getCurrentWorkspace = createSelector(
  state => state.resources.workspaces,
  state => state.app.workspaceId,
  (workspaces, _id) => workspaces && workspaces[_id]
);

export const getCurrentWorkspaceId = createSelector(
  state => state.app.workspaceId,
  _id => _id
);

export default {
  getCurrentUser,
  getCurrentUserId,
  getCurrentWorkspace,
  getCurrentWorkspaceId
};
