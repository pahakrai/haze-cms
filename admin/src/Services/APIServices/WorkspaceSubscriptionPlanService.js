import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getAllWorkspaceSubscriptionPlans = query => {
  return ecommApi.get(`/subscription-plans?${serialize(query)}`);
};
const getWorkspaceSubscriptionsById = (id, query) => {
  return ecommApi.get('/workspace-plans/' + id + '?' + serialize(query));
};

export default {
  getWorkspaceSubscriptionsById,
  getAllWorkspaceSubscriptionPlans
};
