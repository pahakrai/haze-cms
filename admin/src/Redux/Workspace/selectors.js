import { createSelector } from 'reselect';

export const getWorkspaceByCode = createSelector(
  state => state.resources.workspaces,
  (state, workspaceCode) => workspaceCode,
  (workspaces, code) => {
    return Object.values(workspaces).find(v => v.code === code);
  }
);

export const getWorkspaceContactId = createSelector(
  state => state.resources.workspaceContacts,
  (state, contactId) => contactId,
  (workspaceContacts, contactId) => {
    return Object.values(workspaceContacts).find(v => v._id === contactId);
  }
);

export const getCurrentWorkspace = createSelector(
  state => state.resources.workspaces
);

export default {
  getWorkspaceByCode,
  getWorkspaceContactId
};
