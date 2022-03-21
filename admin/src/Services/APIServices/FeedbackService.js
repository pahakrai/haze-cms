import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getFeedbackById = (_id, search) =>
  hazeApi.get(`feedbacks/${_id}?` + serialize(search))
export const getFeedbacks = (search) =>
  hazeApi.get('feedbacks?' + serialize(search))
export const self = hazeApi

export default {
  self: hazeApi,
  getFeedbackById,
  getFeedbacks
}
