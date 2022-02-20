import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ShipmentTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [ShipmentTypes.SET_RESULTS]: setField('results', 'results'),
  [ShipmentTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [ShipmentTypes.SET_SELECTED]: setField('selected', 'id'),
  [ShipmentTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
