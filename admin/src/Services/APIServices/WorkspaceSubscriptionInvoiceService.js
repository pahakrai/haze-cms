import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getWorkspaceSubscriptionInvoices = (query) =>
  hazeApi.get(`/workspace-subscription-invoices?${serialize(query)}`)

const getWorkspaceSubscriptionInvoicesById = (id, query) => {
  return hazeApi.get(
    '/workspace-subscription-invoices/' + id + '?' + serialize(query)
  )
}
const createWorkspaceSubscriptionInvoice = (workspaceSubscriptionInvoice) =>
  hazeApi.post(`workspace-subscription-invoices`, workspaceSubscriptionInvoice)

const updateWorkspaceSubscriptionInvoice = (workspaceSubscriptionInvoice) =>
  hazeApi.put(
    `workspace-subscription-invoices/${workspaceSubscriptionInvoice._id}`,
    workspaceSubscriptionInvoice
  )

export default {
  getWorkspaceSubscriptionInvoices,
  getWorkspaceSubscriptionInvoicesById,
  createWorkspaceSubscriptionInvoice,
  updateWorkspaceSubscriptionInvoice
}
