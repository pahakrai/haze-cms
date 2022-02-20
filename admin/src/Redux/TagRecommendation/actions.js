import { createActions } from 'reduxsauce';

export const {
  Types: TagRecommendationTypes,
  Creators: TagRecommendationActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getTagRecommendations: ['type'],

    /* ------------- Reducers ------------- */
    setResults: ['results'],
    reset: null
  },
  { prefix: 'TagRecommendation/' }
);
