import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getVehicleCapabilities = async opts => {
  const response = await ecommApi.get(
    '/vehicleCapabilities?' + serialize(opts)
  );
  return response;
};

const getVehicleCapabilityById = async id => {
  const response = await ecommApi.get('/vehicleCapabilities/' + id);
  return response;
};

const createVehicleCapability = async formValues => {
  return ecommApi.post(`/vehicleCapabilities`, formValues);
};

const updateVehicleCapability = async (id, formValues) => {
  return ecommApi.put(`/vehicleCapabilities/` + id, formValues);
};

export default {
  self: ecommApi,
  createVehicleCapability,
  getVehicleCapabilityById,
  getVehicleCapabilities,
  updateVehicleCapability
};
