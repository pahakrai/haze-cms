import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { EdmTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  // edmTemplates: {},
  results: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [EdmTypes.SET_RESULTS]: setField('results', 'results'),
  [EdmTypes.MERGE_RESULTS]: mergeIds('results', 'results')
  // [EmailTypes.SET_EDM_TEMPLATES]: setField('edmTemplates', 'edmTemplates')
});
