import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getAllWorkspaceSubscriptionPlans = (query) => {
  return hazeApi.get(`/subscription-plans?${serialize(query)}`)
}
const getWorkspaceSubscriptionsById = (id, query) => {
  return hazeApi.get('/workspace-plans/' + id + '?' + serialize(query))
}

export default {
  getWorkspaceSubscriptionsById,
  getAllWorkspaceSubscriptionPlans
}
