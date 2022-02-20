import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getStores = query => ecommApi.get(`/stores?${serialize(query)}`);

const getStoreById = (id, query) => {
  return ecommApi.get('/stores/' + id + '?' + serialize(query));
};
const createStore = store => ecommApi.post(`stores`, store);

const updateStore = store => ecommApi.put(`stores/${store._id}`, store);

const getPlaceOrderStores = query =>
  ecommApi.get(`/stores/place/order?${serialize(query)}`);

const isDuplicateCode = (code, _id) => {
  return ecommApi.get(
    `/stores/duplicate-code/${code}` + (_id ? `/${_id}` : '')
  );
};

export default {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  getPlaceOrderStores,
  isDuplicateCode
};
