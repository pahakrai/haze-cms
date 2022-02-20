import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { setField, mergeIds } from '../utils/reducer';
import { PricingsTypes } from './actions';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: '',
  pricingResults: []
});

export default createReducer(INITIAL_STATE, {
  [PricingsTypes.SET_RESULTS]: setField('results', 'results'),
  [PricingsTypes.SET_PRICING_RESULTS]: setField(
    'pricingResults',
    'pricingResults'
  ),
  [PricingsTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [PricingsTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults')
});
