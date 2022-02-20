import { createActions } from 'reduxsauce';

export const { Types: SurveyTypes, Creators: SurveyActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getSurveies: ['opts'],
    getSurveyById: ['id'],
    updateSurvey: ['formValues'],
    createSurvey: ['formValues'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Survey/' }
);
