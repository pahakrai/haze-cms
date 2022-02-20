import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getBenefits = query => {
  return ecommApi.get('/benefits?' + serialize(query));
};

export default {
  getBenefits
};
