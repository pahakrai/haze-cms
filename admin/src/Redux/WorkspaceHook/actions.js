import { createActions } from 'reduxsauce';

export const {
  Types: WorkspaceHookTypes,
  Creators: WorkspaceHookActions
} = createActions(
  {
    getWorkspaceHooks: ['query'],
    getAllWorkspaceHooks: ['query', 'refresh'],
    getWorkspaceHookById: ['id'],
    getWorkspaceHookByCode: ['code'],
    searchWorkspaceHooks: ['q', 'query'],

    setAllResults: ['allResults'],
    setResults: ['results'],
    setSearchResults: ['searchResults'],
    mergeResults: ['results'],
    mergeAllResults: ['allResults']
  },
  { prefix: 'WorkspaceHook/' }
);
