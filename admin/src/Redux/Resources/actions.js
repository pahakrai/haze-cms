import { createActions } from 'reduxsauce';

export const { Types, Creators: ResourcesActions } = createActions(
  {
    addEntities: ['entities'],
    addCategories: ['entities', 'parent', 'result'],
    addRegions: ['entities', 'parent', 'result'],
    updateRoom: ['entity'],
    updateProduct: ['entity'],
    updateUser: ['entity'],
    updatePost: ['entity'],
    updatePurchaseItem: ['entity'],
    updatePage: ['entity'],

    updateEntity: ['entities'],
    removeNotificationSchedule: ['_id'],
    removeCartItem: ['_id'],
    removeRoom: ['_id'],
    removeProduct: ['_id'],
    removeEvent: ['_id'],
    removeEventCampaign: ['_id'],
    removeUser: ['_id'],
    removeMember: ['_id'],
    removePurchaseItem: ['_id'],
    removeWorkspace: ['_id'],
    removeOrder: ['_id'],
    removePolicy: ['_id'],
    removeUserGroups: ['_id'],
    reset: null
  },
  { prefix: '_Resource_' }
);

export const ResourceTypes = Types;
export default ResourcesActions;
