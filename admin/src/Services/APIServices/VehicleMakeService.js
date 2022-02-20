import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getVehicleMakes = search =>
  ecommApi.get('vehicle-makes?' + serialize(search));

const getVehicleMakeById = id => {
  return ecommApi.get('vehicle-makes/' + id);
};

const createVehicleMake = formValues => {
  if (!formValues.isActive) formValues.isActive = false;
  return ecommApi.post(`vehicle-makes`, formValues);
};

const updateVehicleMake = (_id, formValues) => {
  return ecommApi.put(`vehicle-makes/` + _id, formValues);
};

export default {
  self: ecommApi,
  createVehicleMake,
  getVehicleMakeById,
  getVehicleMakes,
  updateVehicleMake
};
