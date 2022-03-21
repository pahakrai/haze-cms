import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getPageTemplates = (opts) => {
  return hazeApi.get('/page-templates?' + serialize(opts))
}

const getPageTemplateById = (id, opts) => {
  return hazeApi.get(`/page-templates/${id}?${serialize(opts)}`)
}

const createPageTemplate = (formValues, files) => {
  const data = new FormData()
  files.forEach((f) => data.append(`files`, f))
  const stringtifyBody = JSON.stringify(formValues)
  data.append('pageTemplate', stringtifyBody)
  return hazeApi.post(`/page-templates`, data)
}

const updatePageTemplate = (formValues, files) => {
  const data = new FormData()
  files.forEach((f) => data.append(`files`, f))
  const stringtifyBody = JSON.stringify(formValues)
  data.append('pageTemplate', stringtifyBody)
  return hazeApi.put(`/page-templates/` + formValues._id, data)
}

export default {
  self: hazeApi,
  createPageTemplate,
  getPageTemplateById,
  getPageTemplates,
  updatePageTemplate
}
