import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getProductTypes = (query) =>
  hazeApi.get(`/product-types?${serialize(query)}`)

const getProductTypeById = (id, query) => {
  return hazeApi.get('/product-types/' + id + '?' + serialize(query))
}
const createProductType = (productType) =>
  hazeApi.post(`product-types`, productType)

const updateProductType = (productType) =>
  hazeApi.put(`product-types/${productType._id}`, productType)

export default {
  getProductTypes,
  getProductTypeById,
  createProductType,
  updateProductType
}
