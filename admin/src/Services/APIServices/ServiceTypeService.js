import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getServiceTypesByWorkspaceType = search =>
  ecommApi.get('workspace-types/service-type-display?' + serialize(search));

export default {
  getServiceTypesByWorkspaceType
};
