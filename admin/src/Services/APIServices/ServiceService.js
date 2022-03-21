import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getServices = (query) => hazeApi.get(`/services?${serialize(query)}`)

export const getServiceById = (id, query) =>
  hazeApi.get(`services/${id}?${serialize(query)}`)

const createService = (service, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(service)
  data.append('form', stringtifyBody)
  return hazeApi.post(`services`, data, onUploadProgress)
}

const updateService = (id, service, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(service)
  data.append('form', stringtifyBody)
  return hazeApi.put(`services/${id}`, data, files, onUploadProgress)
}
export default {
  getServices,
  createService,
  updateService,
  getServiceById
}
