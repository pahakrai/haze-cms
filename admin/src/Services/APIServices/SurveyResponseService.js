import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getSurveyResponses = (query) =>
  hazeApi.get(`/survey-responses?${serialize(query)}`)

const getSurveyResponseById = (id, opts) => {
  return hazeApi.get(`/survey-responses/${id}?${serialize(opts)}`)
}

export default {
  getSurveyResponses,
  getSurveyResponseById
}
