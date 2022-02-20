import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getPrices = search =>
  ecommApi.get('pricings?' + serialize(search));

export const self = ecommApi;

export default {
  self: ecommApi,
  getPrices
};
