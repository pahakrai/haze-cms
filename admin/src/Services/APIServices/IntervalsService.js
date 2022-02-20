import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getIntervalsById = (_id, search) =>
  ecommApi.get(`pricings/intervals/${_id}?` + serialize(search));
export const getIntervals = search => {
  if (!search.isHoliday) {
    delete search.isHoliday;
  }
  return ecommApi.get('/pricings/intervals?' + serialize(search));
};
export const self = ecommApi;

export default {
  self: ecommApi,
  getIntervalsById,
  getIntervals
};
