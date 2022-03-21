import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getStores = (query) => hazeApi.get(`/stores?${serialize(query)}`)

const getStoreById = (id, query) => {
  return hazeApi.get('/stores/' + id + '?' + serialize(query))
}
const createStore = (store) => hazeApi.post(`stores`, store)

const updateStore = (store) => hazeApi.put(`stores/${store._id}`, store)

const getPlaceOrderStores = (query) =>
  hazeApi.get(`/stores/place/order?${serialize(query)}`)

const isDuplicateCode = (code, _id) => {
  return hazeApi.get(`/stores/duplicate-code/${code}` + (_id ? `/${_id}` : ''))
}

export default {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  getPlaceOrderStores,
  isDuplicateCode
}
