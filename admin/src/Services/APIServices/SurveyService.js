import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getSurveies = (opts) => {
  return hazeApi.get('/surveys?' + serialize(opts))
}

const getSurveyById = (id) => {
  return hazeApi.get(`/surveys/${id}`)
}

const createSurvey = (formValues) => {
  return hazeApi.post(`/surveys`, formValues)
}

const updateSurvey = (formValues) => {
  return hazeApi.put(`/surveys/` + formValues._id, formValues)
}

export default {
  self: hazeApi,
  createSurvey,
  getSurveyById,
  getSurveies,
  updateSurvey
}
