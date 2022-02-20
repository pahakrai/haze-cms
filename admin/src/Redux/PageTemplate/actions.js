import { createActions } from 'reduxsauce';

export const {
  Types: PageTemplateTypes,
  Creators: PageTemplateActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getPageTemplates: ['opts'],
    getPageTemplateById: ['id', 'opts'],
    updatePageTemplate: ['formValues', 'files'],
    createPageTemplate: ['formValues', 'files'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'PageTemplate/' }
);
