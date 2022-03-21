import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getDevices = (query) => hazeApi.get(`/devices?${serialize(query)}`)

export const getDeviceById = (id) => hazeApi.get('devices/' + id)

const createDevice = (device) => hazeApi.post(`devices`, device)

const updateDevice = (device) => hazeApi.put(`devices/${device._id}`, device)

export default {
  getDevices,
  createDevice,
  updateDevice,
  getDeviceById
}
