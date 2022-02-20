import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getLanguages = query => {
  return ecommApi.get('/languages?' + serialize(query));
};

export default {
  getLanguages
};
