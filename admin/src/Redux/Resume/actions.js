import { createActions } from 'reduxsauce';

export const { Types: ResumeTypes, Creators: ResumeActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getResumeByUserId: ['id'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id']
  },
  { prefix: 'Resume/' }
);
