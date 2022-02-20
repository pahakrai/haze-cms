import { createActions } from 'reduxsauce';

export const {
  Types: SurveyResponseTypes,
  Creators: SurveyResponseActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getSurveyResponses: ['opts'],
    getSurveyResponseById: ['id', 'opts'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'SurveyResponse/' }
);
