import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getUserVehicleList = async opts => {
  const response = await ecommApi.get('/user-vehicles?' + serialize(opts));
  return response;
};

export default {
  getUserVehicleList
};
