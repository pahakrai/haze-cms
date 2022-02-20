import { createActions } from 'reduxsauce';

export const {
  Types: PageSectionTypes,
  Creators: PageSectionActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getPageSection: ['opts'],
    getPageSectionById: ['id', 'opts'],
    updatePageSection: ['formValues', 'files'],
    createPageSection: ['formValues', 'files'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'PageSection/' }
);
