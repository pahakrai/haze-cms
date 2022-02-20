import { createActions } from 'reduxsauce';

export const { Types: SubjectTypes, Creators: SubjectActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getAllSubject: ['opts'],
    updateSubject: ['formValues'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id']
  },
  { prefix: 'Subject/' }
);
