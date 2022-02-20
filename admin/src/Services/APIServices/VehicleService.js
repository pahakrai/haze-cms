import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const findVehicleById = (_id, search) =>
  ecommApi.get(`vehicles/${_id}?` + serialize(search));
export const getVehicles = search => {
  if (!search.plateNo) search.plateNo = '';
  return ecommApi.get('vehicles?' + serialize(search));
};
export const searchVehicles = q => ecommApi.get('vehicles?q=' + q);
export const updateVehicle = data => ecommApi.put('vehicles/' + data._id, data);
export const deleteVehicle = id => ecommApi.delete('vehicles/' + id);
export const createVehicle = data => ecommApi.post('vehicles/', data);
export const updateVehicleImage = (vehicleId, files, onUploadProgress) => {
  const data = new FormData();
  if (files) files.forEach(f => data.append(`files`, f));

  return ecommApi.put(`vehicles/${vehicleId}/image`, data, {
    onUploadProgress
  });
};
export const updateVehicleRegistrationDoc = (
  vehicleId,
  files,
  onUploadProgress
) => {
  const data = new FormData();
  if (files) files.forEach(f => data.append(`files`, f));

  return ecommApi.put(`vehicles/${vehicleId}/vehicle-registration-doc`, data, {
    onUploadProgress
  });
};

export const updateVehiclePreference = (id, body) =>
  ecommApi.patch(`vehicles/${id}/preference`, body);
export const self = ecommApi;

export default {
  self: ecommApi,
  findVehicleById,
  getVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  updateVehicleImage,
  updateVehicleRegistrationDoc,
  createVehicle,
  updateVehiclePreference
};
