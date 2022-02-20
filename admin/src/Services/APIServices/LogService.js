import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getLogs = async query => {
  const queryString = serialize(query);
  const response = await ecommApi.get('/logs?' + queryString);
  return response;
};

export default {
  self: ecommApi,
  getLogs
};
