import { createActions } from 'reduxsauce';

export const {
  Types: WorkspacePaymentMethodTypes,
  Creators: WorkspacePaymentMethodActions
} = createActions(
  {
    getWorkspacePaymentMethods: ['opts'],
    getAllWorkspacePaymentMethods: ['query'],
    getWorkspacePaymentMethodById: ['id', 'query'],
    createWorkspacePaymentMethod: ['formValues'],
    updateWorkspacePaymentMethod: ['formValues'],
    toggleActive: ['id', 'active'],
    deleteWorkspacePaymentMethod: ['id'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setAllResults: ['allResults']
  },
  { prefix: 'WorkspacePaymentMethod/' }
);
