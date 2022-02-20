import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getHolidays = query => {
  return ecommApi.get('/public-holidays?' + serialize(query));
};
const createHoliday = query => ecommApi.post('/public-holidays', query);

const updateHoliday = formValues =>
  ecommApi.put(`/public-holidays/${formValues.id}`, formValues.value);

const deleteHoliday = _id => ecommApi.delete('public-holidays/' + _id);

export default {
  self: ecommApi,
  getHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday
};
