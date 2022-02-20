import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getUserTypes = search =>
  ecommApi.get('workspace-types/user-type-display?' + serialize(search));

export default {
  getUserTypes
};
