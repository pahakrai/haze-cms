import { createActions } from 'reduxsauce';

export const { Types: PolicyTypes, Creators: PolicyActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getPolicies: ['opts'],
    getPolicyById: ['id'],
    updatePolicy: ['formValues'],
    createPolicy: ['formValues'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Policy/' }
);
