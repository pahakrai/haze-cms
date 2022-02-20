import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getAddresss = query => {
  return ecommApi.get('/addresss?' + serialize(query));
};

export const createAddress = formValues => {
  return ecommApi.post('/addresss', formValues);
};

export const updateAddress = formValues => {
  return ecommApi.put(`/addresss/` + formValues._id, formValues);
};

export default {
  getAddresss,
  createAddress,
  updateAddress
};
