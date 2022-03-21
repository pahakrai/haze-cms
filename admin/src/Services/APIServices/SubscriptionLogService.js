import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getSubscriptionLogs = (search) =>
  hazeApi.get('feedbacks/find/subscription-logs?' + serialize(search))

export const self = hazeApi

export default {
  self: hazeApi,
  getSubscriptionLogs
}
