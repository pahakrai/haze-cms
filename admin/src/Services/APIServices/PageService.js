import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getPages = (opts) => {
  return hazeApi.get('/pages?' + serialize(opts))
}

const getPageById = (id) => {
  return hazeApi.get('/pages/' + id)
}

const createPage = (formValues) => {
  return hazeApi.post(`/pages`, formValues)
}

const updatePage = (formValues) => {
  return hazeApi.put(`/pages/` + formValues._id, formValues)
}

const duplicatePath = (_id, path) => {
  const formatPath = path.replace('/', '%2F')
  return hazeApi.get(`pages/duplicate-path/${_id}/` + formatPath)
}

const getTemplateWhenCreatePage = () => hazeApi.get('/pages/get/template')

export default {
  self: hazeApi,
  createPage,
  getPageById,
  getPages,
  updatePage,
  duplicatePath,
  getTemplateWhenCreatePage
}
