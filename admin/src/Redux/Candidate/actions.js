import { createActions } from 'reduxsauce';

export const {
  Types: CandidateTypes,
  Creators: CandidateActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getCandidates: ['opts'],
    getAllCandidate: ['opts'],
    updateCandidate: ['formValues'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id']
  },
  { prefix: 'Candidate/' }
);
