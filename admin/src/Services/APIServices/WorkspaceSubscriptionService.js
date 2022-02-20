import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getWorkspaceSubscriptions = query =>
  ecommApi.get(`/workspace-subscriptions?${serialize(query)}`);

const getWorkspaceSubscriptionsById = (id, query) => {
  return ecommApi.get(
    '/workspace-subscriptions/' + id + '?' + serialize(query)
  );
};
const createWorkspaceSubscription = workspaceSubscription =>
  ecommApi.post(`workspace-subscriptions`, workspaceSubscription);

const updateWorkspaceSubscription = workspaceSubscription =>
  ecommApi.put(
    `workspace-subscriptions/${workspaceSubscription._id}`,
    workspaceSubscription
  );

export default {
  getWorkspaceSubscriptions,
  getWorkspaceSubscriptionsById,
  createWorkspaceSubscription,
  updateWorkspaceSubscription
};
