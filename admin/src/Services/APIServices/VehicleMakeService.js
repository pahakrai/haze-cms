import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getVehicleMakes = (search) =>
  hazeApi.get('vehicle-makes?' + serialize(search))

const getVehicleMakeById = (id) => {
  return hazeApi.get('vehicle-makes/' + id)
}

const createVehicleMake = (formValues) => {
  if (!formValues.isActive) formValues.isActive = false
  return hazeApi.post(`vehicle-makes`, formValues)
}

const updateVehicleMake = (_id, formValues) => {
  return hazeApi.put(`vehicle-makes/` + _id, formValues)
}

export default {
  self: hazeApi,
  createVehicleMake,
  getVehicleMakeById,
  getVehicleMakes,
  updateVehicleMake
}
