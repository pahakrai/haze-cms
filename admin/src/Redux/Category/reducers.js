import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { CategoryTypes } from './actions';
import { setField, reset, mergeIds } from '../utils/reducer';

export const TOP_LEVEL_CATEGORY = '__ROOT__';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  categoriesWithChildrenResults: [],
  allResults: [],
  allDistrict: [],
  created: null,
  expanded: {},
  searchTerm: '',
  deleted: null
});

const setExpanded = (state, { category, isExpanded }) =>
  state.setIn(['expanded', category], isExpanded);

const resetExpanded = state => state.set('expanded', {});

export default createReducer(INITIAL_STATE, {
  [CategoryTypes.SET_CREATED]: setField('created', 'id'),
  [CategoryTypes.SET_RESULTS]: setField('results', 'results'),
  [CategoryTypes.SET_CATEGORIES_WITH_CHILDREN_RESULT]: setField(
    'categoriesWithChildrenResults',
    'results'
  ),
  [CategoryTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [CategoryTypes.SET_SELECTED]: setField('selected', 'id'),
  [CategoryTypes.SET_DELETED]: setField('deleted', 'id'),
  [CategoryTypes.SET_EXPANDED]: setExpanded,
  [CategoryTypes.RESET_EXPANDED]: resetExpanded,
  [CategoryTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [CategoryTypes.MERGE_ALL_RESULTS]: mergeIds('allResults', 'allResults'),
  [CategoryTypes.SET_ALL_DISTRICT]: setField('allDistrict', 'allDistrict'),
  [CategoryTypes.RESET]: reset(INITIAL_STATE)
});
