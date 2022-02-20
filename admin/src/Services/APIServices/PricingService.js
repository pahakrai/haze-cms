import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getPricingById = _id => ecommApi.get(`pricings/${_id}`);

export const getPricingsList = search =>
  ecommApi.get('pricings/routes?' + serialize(search));

export const updatePricingsById = _id => ecommApi.put(`pricings/${_id}`);

export const getPricingServices = search =>
  ecommApi.get('pricings/services?' + serialize(search));

const createPricingService = pricing =>
  ecommApi.post(`pricings/createPricingService`, pricing);

const createPricingTunnel = pricing =>
  ecommApi.post(`pricings/createPricingTunnel`, pricing);

const updatePricing = pricing =>
  ecommApi.put(`pricings/${pricing._id}`, pricing);

const updatePricingTunnel = pricingTunnel =>
  ecommApi.put(
    `pricings/${pricingTunnel._id}/updatePricingTunnel`,
    pricingTunnel
  );

export const getPricingTunnel = search =>
  ecommApi.get('pricings/tunnels?' + serialize(search));

const duplicateVehicleType = (vehicleType, tunnelId, _id) => {
  return ecommApi.get(
    `/pricings/duplicate-vehicle-type/${vehicleType}/${tunnelId}` +
      (_id ? `/${_id}` : '')
  );
};

export const self = ecommApi;

export default {
  self: ecommApi,
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
};
