import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getVehicleCategories = async (query) => {
  const queryString = serialize(query)
  const response = await hazeApi.get('/vehicleCategories?' + queryString)
  return response
}

const getVehicleCategoryById = (id) => hazeApi.get(`vehicleCategories/${id}`)

const createVehicleCategory = (
  vehicleCategory,
  files = [],
  onUploadProgress
) => {
  const data = new FormData()
  if (files[0]) {
    data.append(`files`, files[0])
  }
  const stringtifyBody = JSON.stringify(vehicleCategory)
  data.append('vehicleCategory', stringtifyBody)
  return hazeApi.post(`vehicleCategories`, data, { onUploadProgress })
}

const updateVehicleCategory = (
  id,
  vehicleCategory,
  files,
  onUploadProgress
) => {
  const data = new FormData()
  if (files[0]) {
    data.append(`files`, files[0])
  }
  const stringtifyBody = JSON.stringify(vehicleCategory)
  data.append('vehicleCategory', stringtifyBody)
  return hazeApi.put(`vehicleCategories/${id}`, data, {
    onUploadProgress
  })
}

const deleteVehicleCategory = (id) => hazeApi.delete('vehicleCategories/' + id)

export default {
  getVehicleCategories,
  getVehicleCategoryById,
  createVehicleCategory,
  updateVehicleCategory,
  deleteVehicleCategory
}
