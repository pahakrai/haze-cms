import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const findVehicleById = (_id, search) =>
  hazeApi.get(`vehicles/${_id}?` + serialize(search))
export const getVehicles = (search) => {
  if (!search.plateNo) search.plateNo = ''
  return hazeApi.get('vehicles?' + serialize(search))
}
export const searchVehicles = (q) => hazeApi.get('vehicles?q=' + q)
export const updateVehicle = (data) => hazeApi.put('vehicles/' + data._id, data)
export const deleteVehicle = (id) => hazeApi.delete('vehicles/' + id)
export const createVehicle = (data) => hazeApi.post('vehicles/', data)
export const updateVehicleImage = (vehicleId, files, onUploadProgress) => {
  const data = new FormData()
  if (files) files.forEach((f) => data.append(`files`, f))

  return hazeApi.put(`vehicles/${vehicleId}/image`, data, {
    onUploadProgress
  })
}
export const updateVehicleRegistrationDoc = (
  vehicleId,
  files,
  onUploadProgress
) => {
  const data = new FormData()
  if (files) files.forEach((f) => data.append(`files`, f))

  return hazeApi.put(`vehicles/${vehicleId}/vehicle-registration-doc`, data, {
    onUploadProgress
  })
}

export const updateVehiclePreference = (id, body) =>
  hazeApi.patch(`vehicles/${id}/preference`, body)
export const self = hazeApi

export default {
  self: hazeApi,
  findVehicleById,
  getVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  updateVehicleImage,
  updateVehicleRegistrationDoc,
  createVehicle,
  updateVehiclePreference
}
