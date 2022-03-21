import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getResumeByUserId = (id, query) =>
  hazeApi.get('resumes/user/' + id + '?' + serialize(query))

export default {
  getResumeByUserId
}
