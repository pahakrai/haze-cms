import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getProductTypes = query =>
  ecommApi.get(`/product-types?${serialize(query)}`);

const getProductTypeById = (id, query) => {
  return ecommApi.get('/product-types/' + id + '?' + serialize(query));
};
const createProductType = productType =>
  ecommApi.post(`product-types`, productType);

const updateProductType = productType =>
  ecommApi.put(`product-types/${productType._id}`, productType);

export default {
  getProductTypes,
  getProductTypeById,
  createProductType,
  updateProductType
};
