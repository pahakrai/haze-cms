import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { EventCampaignTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: '',
  searchResults: [],
  notOrderedResults: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [EventCampaignTypes.SET_RESULTS]: setField('results', 'results'),
  [EventCampaignTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [EventCampaignTypes.SET_SELECTED]: setField('selected', 'id'),
  [EventCampaignTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [EventCampaignTypes.SET_SEARCH_RESULTS]: setField('searchResults', 'results'),
  [EventCampaignTypes.SET_NOT_ORDERED_RESULTS]: setField(
    'notOrderedResults',
    'results'
  )
});
