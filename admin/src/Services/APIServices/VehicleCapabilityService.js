import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getVehicleCapabilities = async (opts) => {
  const response = await hazeApi.get('/vehicleCapabilities?' + serialize(opts))
  return response
}

const getVehicleCapabilityById = async (id) => {
  const response = await hazeApi.get('/vehicleCapabilities/' + id)
  return response
}

const createVehicleCapability = async (formValues) => {
  return hazeApi.post(`/vehicleCapabilities`, formValues)
}

const updateVehicleCapability = async (id, formValues) => {
  return hazeApi.put(`/vehicleCapabilities/` + id, formValues)
}

export default {
  self: hazeApi,
  createVehicleCapability,
  getVehicleCapabilityById,
  getVehicleCapabilities,
  updateVehicleCapability
}
