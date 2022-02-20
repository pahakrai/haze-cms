import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getDevices = query => ecommApi.get(`/devices?${serialize(query)}`);

export const getDeviceById = id => ecommApi.get('devices/' + id);

const createDevice = device => ecommApi.post(`devices`, device);

const updateDevice = device => ecommApi.put(`devices/${device._id}`, device);

export default {
  getDevices,
  createDevice,
  updateDevice,
  getDeviceById
};
