import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getProductSkus = opts => {
  return ecommApi.get('/productSkus?' + serialize(opts));
};

const getProductSkuById = (id, opts) => {
  return ecommApi.get('/productSkus/' + id + '?' + serialize(opts));
};

const createProductSku = formValues => {
  return ecommApi.post(`/productSkus`, formValues);
};

const updateProductSku = formValues => {
  return ecommApi.put(`/productSkus/` + formValues._id, formValues);
};

export default {
  self: ecommApi,
  createProductSku,
  getProductSkuById,
  getProductSkus,
  updateProductSku
};
