import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getWorkspacePaymentMethods = query =>
  ecommApi.get(`/workspace-payment-methods?${serialize(query)}`);

const getWorkspacePaymentMethodById = (id, query) => {
  return ecommApi.get(
    '/workspace-payment-methods/' + id + '?' + serialize(query)
  );
};
const createWorkspacePaymentMethod = workspacePaymentMethod =>
  ecommApi.post(`workspace-payment-methods`, workspacePaymentMethod);

const updateWorkspacePaymentMethod = workspacePaymentMethod =>
  ecommApi.put(
    `workspace-payment-methods/${workspacePaymentMethod._id}`,
    workspacePaymentMethod
  );

const toggleActive = (_id, isActive) =>
  ecommApi.put(
    `workspace-payment-methods/${_id}/toggle-isActive?isActive=${isActive}`
  );

const deleteWorkspacePaymentMethod = id =>
  ecommApi.delete(`workspace-payment-methods/${id}`);

export default {
  getWorkspacePaymentMethods,
  getWorkspacePaymentMethodById,
  createWorkspacePaymentMethod,
  updateWorkspacePaymentMethod,
  toggleActive,
  deleteWorkspacePaymentMethod
};
