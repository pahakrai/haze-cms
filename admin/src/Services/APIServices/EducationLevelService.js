import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getEducationLevels = query => {
  return ecommApi.get('/education-levels?' + serialize(query));
};

export default {
  getEducationLevels
};
