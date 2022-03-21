import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getWorkspaceSubscriptions = (query) =>
  hazeApi.get(`/workspace-subscriptions?${serialize(query)}`)

const getWorkspaceSubscriptionsById = (id, query) => {
  return hazeApi.get('/workspace-subscriptions/' + id + '?' + serialize(query))
}
const createWorkspaceSubscription = (workspaceSubscription) =>
  hazeApi.post(`workspace-subscriptions`, workspaceSubscription)

const updateWorkspaceSubscription = (workspaceSubscription) =>
  hazeApi.put(
    `workspace-subscriptions/${workspaceSubscription._id}`,
    workspaceSubscription
  )

export default {
  getWorkspaceSubscriptions,
  getWorkspaceSubscriptionsById,
  createWorkspaceSubscription,
  updateWorkspaceSubscription
}
