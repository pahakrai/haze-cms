import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getCurrencies = query => ecommApi.get(`currencies?` + serialize(query));
const createCurrency = currency => ecommApi.post('currencies', currency);
const updateCurrency = currency =>
  ecommApi.put('currencies/' + currency._id, currency);

export default {
  getCurrencies,
  createCurrency,
  updateCurrency
};
