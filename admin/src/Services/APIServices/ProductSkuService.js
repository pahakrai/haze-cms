import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getProductSkus = (opts) => {
  return hazeApi.get('/productSkus?' + serialize(opts))
}

const getProductSkuById = (id, opts) => {
  return hazeApi.get('/productSkus/' + id + '?' + serialize(opts))
}

const createProductSku = (formValues) => {
  return hazeApi.post(`/productSkus`, formValues)
}

const updateProductSku = (formValues) => {
  return hazeApi.put(`/productSkus/` + formValues._id, formValues)
}

export default {
  self: hazeApi,
  createProductSku,
  getProductSkuById,
  getProductSkus,
  updateProductSku
}
