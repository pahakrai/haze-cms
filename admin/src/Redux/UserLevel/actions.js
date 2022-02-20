import { createActions } from 'reduxsauce';

export const {
  Types: UserLevelTypes,
  Creators: UserLevelActions
} = createActions(
  {
    getUserLevels: ['opts'],
    getUserLevelById: ['id'],
    createUserLevel: ['formValues'],
    updateUserLevel: ['formValues'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'UserLevel/' }
);
