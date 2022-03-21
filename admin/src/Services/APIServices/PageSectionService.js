import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getPageSection = (opts) => {
  return hazeApi.get('/pages?' + serialize(opts))
}

const getPageSectionById = (id, opts) => {
  return hazeApi.get(`/pages/${id}?${serialize(opts)}`)
}

const createPageSection = (formValues, files) => {
  const data = new FormData()
  files.forEach((f) => data.append(`files`, f))
  const stringtifyBody = JSON.stringify(formValues)
  data.append('pageSection', stringtifyBody)
  return hazeApi.post(`/pages`, data)
}

const updatePageSection = (formValues, files) => {
  const data = new FormData()
  files.forEach((f) => data.append(`files`, f))
  const stringtifyBody = JSON.stringify(formValues)
  data.append('pageSection', stringtifyBody)
  return hazeApi.put(`/pages/` + formValues._id, data)
}

export default {
  self: hazeApi,
  createPageSection,
  getPageSectionById,
  getPageSection,
  updatePageSection
}
