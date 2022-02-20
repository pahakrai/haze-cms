import { createActions } from 'reduxsauce';

export const { Types: EdmTypes, Creators: EdmActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    // getEmailTemplates: null,
    findEdmById: ['id'],
    createEdm: ['edm'],
    updateEdm: ['edm'],
    delectEdm: ['_id'],
    updateEdmStatus: ['_id', 'isActive'],
    getEdms: ['opts'],
    getAllEdms: ['query'],
    sendEdms: ['edm'],

    /* ------------- Reducers ------------- */
    // setEdmTemplates: ['edmTemplates'],
    setResults: ['results'],
    mergeResults: ['results'],
    reset: null
  },
  { prefix: 'Edm/' }
);
