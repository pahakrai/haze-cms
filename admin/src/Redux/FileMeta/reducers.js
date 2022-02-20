import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { FileMetaTypes } from './actions';
import { setField } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  searchTerm: '',
  results: [],
  deleted: null
});

export default createReducer(INITIAL_STATE, {
  [FileMetaTypes.SET_RESULTS]: setField('results', 'results'),
  [FileMetaTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [FileMetaTypes.SET_SELECTED]: setField('selected', 'id'),
  [FileMetaTypes.SET_DELETED]: setField('deleted', 'id')
});
