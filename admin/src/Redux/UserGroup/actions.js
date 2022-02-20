import { createActions } from 'reduxsauce';

export const {
  Types: UserGroupTypes,
  Creators: UserGroupActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getUserGroups: ['opts'],
    getUserGroupById: ['id'],
    deleteUserGroupById: ['id'],
    updateUserGroup: ['form'],
    createUserGroup: ['form'],

    /* ------------- Reducers ------------- */
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'UserGroup/' }
);
