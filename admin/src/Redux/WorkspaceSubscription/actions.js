import { createActions } from 'reduxsauce';

export const {
  Types: WorkspaceSubscriptionTypes,
  Creators: WorkspaceSubscriptionActions
} = createActions(
  {
    getWorkspaceSubscriptions: ['opts'],
    getWorkspaceSubscriptionById: ['id', 'query'],
    createWorkspaceSubscription: ['formValues'],
    updateWorkspaceSubscription: ['formValues'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'WorkspaceSubscription/' }
);
