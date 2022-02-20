import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getWorkspacePriceTypes = query =>
  ecommApi.get(`/workspace-price-types?${serialize(query)}`);

export default {
  getWorkspacePriceTypes
};
