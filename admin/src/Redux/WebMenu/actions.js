import { createActions } from 'reduxsauce';

export const { Types: WebMenuTypes, Creators: WebMenuActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getWebMenus: ['opts'],

    /* ------------- Reducers ------------- */
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'WebMenu/' }
);
