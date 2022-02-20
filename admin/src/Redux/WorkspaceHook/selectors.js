import { createSelector } from 'reselect';

export const getWorkspaceHookByCode = createSelector(
  state => state.resources.workspaceHooks,
  (state, workspaceCode) => workspaceCode,
  (workspaceHooks, code) => {
    return Object.values(workspaceHooks).find(v => v.code === code);
  }
);

export default {
  getWorkspaceHookByCode
};
