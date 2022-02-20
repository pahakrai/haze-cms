import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getMerchants = opts => {
  return ecommApi.get('/merchants?' + serialize(opts));
};

const getMerchantById = id => {
  return ecommApi.get('/merchants/' + id, { populates: ['user'] });
};

const createMerchant = formValues => {
  return ecommApi.post(`/merchants`, formValues);
};

const updateMerchant = formValues => {
  return ecommApi.put(`/merchants/` + formValues._id, formValues);
};

export const searchMerchants = opts =>
  ecommApi.get('merchants?' + serialize(opts));

const getMerchantFileType = async () =>
  await ecommApi.get('merchants/user-requirements/files');

export default {
  self: ecommApi,
  createMerchant,
  getMerchantById,
  getMerchants,
  updateMerchant,
  searchMerchants,
  getMerchantFileType
};
