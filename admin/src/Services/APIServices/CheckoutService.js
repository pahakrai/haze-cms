import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const checkout = body => {
  const opts = {
    finalize: false
  };
  return ecommApi.post(`/checkouts?${serialize(opts)}`, body);
};

export default {
  self: ecommApi,
  checkout
};
