import { createActions } from 'reduxsauce';

export const {
  Types: WorkspaceSubscriptionInvoiceTypes,
  Creators: WorkspaceSubscriptionInvoiceActions
} = createActions(
  {
    getWorkspaceSubscriptionInvoices: ['opts'],
    getWorkspaceSubscriptionInvoiceById: ['id', 'query'],
    createWorkspaceSubscriptionInvoice: ['formValues'],
    updateWorkspaceSubscriptionInvoice: ['formValues'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'WorkspaceSubscriptionInvoice/' }
);
