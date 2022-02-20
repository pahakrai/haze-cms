import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const findDriverById = (_id, search) =>
  ecommApi.get(`drivers/${_id}?` + serialize(search));
export const getUsers = search => ecommApi.get('users/?' + serialize(search));
export const getDrivers = search =>
  ecommApi.get('drivers?' + serialize(search));
export const searchDrivers = q => ecommApi.get('drivers?q=' + q);
export const updateDriver = (_id, driver, files, onUploadProgress) => {
  const data = new FormData();
  files.forEach(f => data.append(`files`, f));
  const stringtifyBody = JSON.stringify(driver);
  data.append('driver', stringtifyBody);
  return ecommApi.put(`drivers/${_id}`, data, { onUploadProgress });
};
export const deleteDriver = id => ecommApi.delete('drivers/' + id);
export const createDriver = (driver, files, onUploadProgress) => {
  const data = new FormData();
  files.forEach(f => data.append(`files`, f));
  const stringtifyBody = JSON.stringify(driver);
  data.append('driver', stringtifyBody);
  return ecommApi.post(`drivers`, data, { onUploadProgress });
};

export const updateDriverLicenseCardImage = (
  driverId,
  files,
  onUploadProgress
) => {
  const data = new FormData();
  if (files) files.forEach(f => data.append(`files`, f));

  return ecommApi.put(`drivers/${driverId}/licenseCardImage`, data, {
    onUploadProgress
  });
};
const signUp = async user => {
  return ecommApi.post('drivers/sign-up', {
    user
    // driver: {},
    // vehicle: {}
  });
};
export const self = ecommApi;

export default {
  self: ecommApi,
  findDriverById,
  getUsers,
  signUp,
  getDrivers,
  searchDrivers,
  updateDriver,
  updateDriverLicenseCardImage,
  deleteDriver,
  createDriver
};
