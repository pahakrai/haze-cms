import { createActions } from 'reduxsauce';

export const {
  Types: WorkspaceAppTypes,
  Creators: WorkspaceAppActions
} = createActions(
  {
    getWorkspaceApps: ['opts'],
    getWorkspaceAppById: ['id', 'query'],
    createWorkspaceApp: ['formValues'],
    updateWorkspaceApp: ['formValues'],
    deleteWorkspaceApp: ['id'],
    releaseNewVersion: ['id', 'platformType'],
    createNewVersion: ['id', 'platformType', 'value'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'WorkspaceApp/' }
);
