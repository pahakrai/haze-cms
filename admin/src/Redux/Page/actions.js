import { createActions } from 'reduxsauce';

export const { Types: PageTypes, Creators: PageActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getPages: ['opts'],
    searchSelectPageTemplates: ['opts'],
    getPageById: ['id'],
    updatePage: ['formValues'],
    updatePageNotForm: ['formValues', 'callback'],
    createPage: ['formValues'],
    getPageTemplates: ['opts'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setSearchResults: ['searchResults'],
    setLoginPageData: ['data']
  },
  { prefix: 'Page/' }
);
