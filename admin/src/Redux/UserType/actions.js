import { createActions } from 'reduxsauce';

export const {
  Types: UserTypeTypes,
  Creators: UserTypeActions
} = createActions(
  {
    // sage
    getUserTypes: ['opts'],

    // reducers
    setResults: ['results'],
    setSearchSelectResults: ['searchSelectResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'UserType/' }
);
