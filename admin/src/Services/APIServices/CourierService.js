import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getCouriers = opts => ecommApi.get(`couriers?` + serialize(opts));
const createCourier = courier => ecommApi.post('couriers', courier);
const updateCourier = courier => {
  return ecommApi.put(`/couriers/` + courier._id, courier);
};

const getCourierById = (id, opts) =>
  ecommApi.get('couriers/' + id + '?' + serialize(opts));

export default {
  getCouriers,
  createCourier,
  updateCourier,
  getCourierById
};
