import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { RegionTypes } from './actions';
import { setField, reset, mergeIds } from '../utils/reducer';

export const TOP_LEVEL_REGION = '__ROOT__';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  regionPinsResults: [],
  regionsWithChildrenResults: [],
  allResults: [],
  allDistrict: [],
  created: null,
  expanded: {},
  searchTerm: '',
  deleted: null
});

const setExpanded = (state, { region, isExpanded }) =>
  state.setIn(['expanded', region], isExpanded);

const resetExpanded = state => state.set('expanded', {});

export default createReducer(INITIAL_STATE, {
  [RegionTypes.MERGE_REGION_PINS]: mergeIds(['regionPinsResults']),
  [RegionTypes.SET_REGION_PINS]: setField('regionPinsResults', '_ids'),
  [RegionTypes.SET_CREATED]: setField('created', 'id'),
  [RegionTypes.SET_RESULTS]: setField('results', 'results'),
  [RegionTypes.SET_REGIONS_WITH_CHILDREN_RESULT]: setField(
    'regionsWithChildrenResults',
    'results'
  ),
  [RegionTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [RegionTypes.SET_SELECTED]: setField('selected', 'id'),
  [RegionTypes.SET_DELETED]: setField('deleted', 'id'),
  [RegionTypes.SET_EXPANDED]: setExpanded,
  [RegionTypes.RESET_EXPANDED]: resetExpanded,
  [RegionTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [RegionTypes.MERGE_ALL_RESULTS]: mergeIds('allResults', 'allResults'),
  [RegionTypes.SET_ALL_DISTRICT]: setField('allDistrict', 'allDistrict'),
  [RegionTypes.RESET]: reset(INITIAL_STATE)
});
