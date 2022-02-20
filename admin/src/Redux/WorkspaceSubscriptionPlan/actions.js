import { createActions } from 'reduxsauce';

export const {
  Types: WorkspaceSubscriptionPlanTypes,
  Creators: WorkspaceSubscriptionPlanActions
} = createActions(
  {
    getAllWorkspaceSubscriptionPlans: ['query'],
    getWorkspaceSubscriptionPlanById: ['id', 'query'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    setAllResults: ['allResults'],
    setResults: ['results'],
    setSearchResults: ['searchResults'],
    mergeResults: ['results'],
    mergeAllResults: ['allResults']
  },
  { prefix: 'WorkspaceSubscriptionPlan/' }
);
