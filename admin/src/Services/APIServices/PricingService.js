import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getPricingById = (_id) => hazeApi.get(`pricings/${_id}`)

export const getPricingsList = (search) =>
  hazeApi.get('pricings/routes?' + serialize(search))

export const updatePricingsById = (_id) => hazeApi.put(`pricings/${_id}`)

export const getPricingServices = (search) =>
  hazeApi.get('pricings/services?' + serialize(search))

const createPricingService = (pricing) =>
  hazeApi.post(`pricings/createPricingService`, pricing)

const createPricingTunnel = (pricing) =>
  hazeApi.post(`pricings/createPricingTunnel`, pricing)

const updatePricing = (pricing) =>
  hazeApi.put(`pricings/${pricing._id}`, pricing)

const updatePricingTunnel = (pricingTunnel) =>
  hazeApi.put(
    `pricings/${pricingTunnel._id}/updatePricingTunnel`,
    pricingTunnel
  )

export const getPricingTunnel = (search) =>
  hazeApi.get('pricings/tunnels?' + serialize(search))

const duplicateVehicleType = (vehicleType, tunnelId, _id) => {
  return hazeApi.get(
    `/pricings/duplicate-vehicle-type/${vehicleType}/${tunnelId}` +
      (_id ? `/${_id}` : '')
  )
}

export const self = hazeApi

export default {
  self: hazeApi,
  getPricingById,
  getPricingsList,
  updatePricingsById,
  getPricingServices,
  createPricingService,
  createPricingTunnel,
  updatePricing,
  updatePricingTunnel,
  getPricingTunnel,
  duplicateVehicleType
}
