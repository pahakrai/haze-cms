import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getVehicleModels = (search) => {
  if (search.isActive === -1) search.isActive = false
  if (search.isActive === 10) search.isActive = true
  if (search.q === null) search.q = undefined
  return hazeApi.get('vehicle-models?' + serialize(search))
}

const getVehicleModelById = async (id, query) => {
  const response = await hazeApi.get(
    `/vehicle-models/${id}?` + serialize(query)
  )
  return response
}

const createVehicleModel = async (formValues, files, onUploadProgress) => {
  const opts = {}
  if (!formValues.isActive) formValues.isActive = false
  let data = formValues
  if (files) {
    data = new FormData()
    files.forEach((f) => data.append(`files`, f))
    opts.onUploadProgress = onUploadProgress
    data.append('vehicleModel', JSON.stringify(formValues))
  }
  return hazeApi.post(`/vehicle-models`, data, opts)
}

const updateVehicleModel = async (id, formValues, files, onUploadProgress) => {
  const opts = {}
  let data = formValues
  if (files) {
    const data = new FormData()
    files.forEach((f) => data.append(`files`, f))
    opts.onUploadProgress = onUploadProgress
    data.append('vehicleModels', JSON.stringify(formValues))
  }
  return hazeApi.put(`/vehicle-models/` + id, data, opts)
}

export default {
  self: hazeApi,
  createVehicleModel,
  getVehicleModelById,
  getVehicleModels,
  updateVehicleModel
}
