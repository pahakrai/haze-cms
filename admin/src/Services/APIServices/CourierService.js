import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getCouriers = (opts) => hazeApi.get(`couriers?` + serialize(opts))
const createCourier = (courier) => hazeApi.post('couriers', courier)
const updateCourier = (courier) => {
  return hazeApi.put(`/couriers/` + courier._id, courier)
}

const getCourierById = (id, opts) =>
  hazeApi.get('couriers/' + id + '?' + serialize(opts))

export default {
  getCouriers,
  createCourier,
  updateCourier,
  getCourierById
}
