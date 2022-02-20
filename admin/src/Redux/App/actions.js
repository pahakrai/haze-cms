import { createActions } from 'reduxsauce';

export const { Types: AppTypes, Creators: AppActions } = createActions(
  {
    /* ------------- Reducers ------------- */
    setToken: ['token'],
    setCurrentUserId: ['userId'],
    setCurrentWorkspaceId: ['workspaceId'],
    toggleSidebarOpen: ['isOpen'],
    setOpenedNavItemGroups: ['newItems'],
    resetOpenedNavItemGroups: null,
    reset: null
  },
  { prefix: 'App/' }
);
