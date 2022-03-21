import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getVehicleTypes = (search) =>
  hazeApi.get('vehicle-types?' + serialize(search))
export const getAllVehicleTypes = (search) =>
  hazeApi.get('vehicle-types?' + serialize(search))

export const getVehicleTypeById = (id, search) =>
  hazeApi.get('vehicle-types/' + id + '?' + serialize(search))

const createVehicleType = (
  vehicleType,
  iconFiles = [],
  iconActiveFiles = [],
  iconSmallFiles = [],
  onUploadProgress
) => {
  const data = new FormData()
  if (iconFiles[0]) {
    data.append(`icon`, iconFiles[0])
  }
  if (iconActiveFiles[0]) {
    data.append(`activeIcon`, iconActiveFiles[0])
  }
  if (iconSmallFiles[0]) {
    data.append(`smallIcon`, iconSmallFiles[0])
  }
  const stringtifyBody = JSON.stringify(vehicleType)
  data.append('vehicleType', stringtifyBody)
  return hazeApi.post(`vehicle-types`, data, { onUploadProgress })
}

const updateVehicleType = (
  id,
  vehicleType,
  iconFiles = [],
  iconActiveFiles = [],
  iconSmallFiles = [],
  onUploadProgress
) => {
  const data = new FormData()
  if (iconFiles[0]) {
    data.append(`icon`, iconFiles[0])
  }
  if (iconActiveFiles[0]) {
    data.append(`activeIcon`, iconActiveFiles[0])
  }
  if (iconSmallFiles[0]) {
    data.append(`smallIcon`, iconSmallFiles[0])
  }
  const stringtifyBody = JSON.stringify(vehicleType)
  data.append('vehicleType', stringtifyBody)
  return hazeApi.put(`vehicle-types/${id}`, data, {
    onUploadProgress
  })
}

export const self = hazeApi

export default {
  self: hazeApi,
  getVehicleTypes,
  getVehicleTypeById,
  updateVehicleType,
  createVehicleType,
  getAllVehicleTypes
}
