const {
  name: { uc },
  type
} = require('../../constant');

const e = (module.exports = {});

e.content = `
import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ${type} } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [${uc}Types.SET_RESULTS]: setField('results', 'results'),
  [${uc}Types.MERGE_RESULTS]: mergeIds('results', 'results'),
  [${uc}Types.SET_SELECTED]: setField('selected', 'id'),
  [${uc}Types.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
});
`.replace(/^\s/, '');
