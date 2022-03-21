import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getWorkspacePaymentMethods = (query) =>
  hazeApi.get(`/workspace-payment-methods?${serialize(query)}`)

const getWorkspacePaymentMethodById = (id, query) => {
  return hazeApi.get(
    '/workspace-payment-methods/' + id + '?' + serialize(query)
  )
}
const createWorkspacePaymentMethod = (workspacePaymentMethod) =>
  hazeApi.post(`workspace-payment-methods`, workspacePaymentMethod)

const updateWorkspacePaymentMethod = (workspacePaymentMethod) =>
  hazeApi.put(
    `workspace-payment-methods/${workspacePaymentMethod._id}`,
    workspacePaymentMethod
  )

const toggleActive = (_id, isActive) =>
  hazeApi.put(
    `workspace-payment-methods/${_id}/toggle-isActive?isActive=${isActive}`
  )

const deleteWorkspacePaymentMethod = (id) =>
  hazeApi.delete(`workspace-payment-methods/${id}`)

export default {
  getWorkspacePaymentMethods,
  getWorkspacePaymentMethodById,
  createWorkspacePaymentMethod,
  updateWorkspacePaymentMethod,
  toggleActive,
  deleteWorkspacePaymentMethod
}
