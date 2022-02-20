import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getStoreTypes = search =>
  ecommApi.get('store-types?' + serialize(search));

export const getStoreTypeById = (id, search) =>
  ecommApi.get('store-types/' + id + '?' + serialize(search));

const createStoreType = expenseType => {
  return ecommApi.post(`store-types`, expenseType);
};

const updateStoreType = (id, expenseType) => {
  return ecommApi.put(`store-types/${id}`, expenseType);
};

const isDuplicateCode = (code, _id) => {
  return ecommApi.get(
    `/store-types/duplicate-code-value/${code}` + (_id ? `/${_id}` : '')
  );
};

export const self = ecommApi;

export default {
  self: ecommApi,
  getStoreTypes,
  getStoreTypeById,
  updateStoreType,
  createStoreType,
  isDuplicateCode
};
