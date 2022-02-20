import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getWorkspaceSubscriptionInvoices = query =>
  ecommApi.get(`/workspace-subscription-invoices?${serialize(query)}`);

const getWorkspaceSubscriptionInvoicesById = (id, query) => {
  return ecommApi.get(
    '/workspace-subscription-invoices/' + id + '?' + serialize(query)
  );
};
const createWorkspaceSubscriptionInvoice = workspaceSubscriptionInvoice =>
  ecommApi.post(
    `workspace-subscription-invoices`,
    workspaceSubscriptionInvoice
  );

const updateWorkspaceSubscriptionInvoice = workspaceSubscriptionInvoice =>
  ecommApi.put(
    `workspace-subscription-invoices/${workspaceSubscriptionInvoice._id}`,
    workspaceSubscriptionInvoice
  );

export default {
  getWorkspaceSubscriptionInvoices,
  getWorkspaceSubscriptionInvoicesById,
  createWorkspaceSubscriptionInvoice,
  updateWorkspaceSubscriptionInvoice
};
