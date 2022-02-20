import { createActions } from 'reduxsauce';

export const { Types: MemberTypes, Creators: MemberActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getMembers: ['opts'],
    getMemberById: ['id'],
    updateMember: ['formValues'],
    createMember: ['formValues'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Member/' }
);
