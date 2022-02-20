import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { FilterTypes } from './actions';
import { reset } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  partner: {
    searchTerm: '',
    sort: '',
    sortOrder: 'asc',
    limit: 10,
    offset: 0
  },
  device: {
    searchTerm: ''
  },
  deviceActivity: {
    searchTerm: '',
    searchOptions: {},
    limit: 10,
    offset: 0
  },
  page: {
    searchTerm: '',
    limit: 10,
    offset: 0
  },
  postComment: {
    searchTerm: '',
    searchOptions: {},
    limit: 10,
    offset: 0
  },
  log: {
    searchTerm: '',
    limit: 10,
    offset: 0
  },
  user: {
    q: '',
    searchOptions: {}
  },
  dataMapping: {
    searchTerm: '',
    limit: 10,
    offset: 0
  }
});

const updateFilter = (state, { field, filter }) => state.set(field, filter);
const updateFilterField = (state, { field, filterField, value }) =>
  state.setIn([field, filterField], value);

export default createReducer(INITIAL_STATE, {
  [FilterTypes.RESET]: reset(INITIAL_STATE),
  [FilterTypes.UPDATE_FILTER]: updateFilter,
  [FilterTypes.UPDATE_FILTER_FIELD]: updateFilterField
});
