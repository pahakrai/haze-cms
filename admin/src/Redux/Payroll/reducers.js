import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PayrollTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  summary: {},
  created: null,
  searchTerm: '',
  payeeUserType: ''
});

export default createReducer(INITIAL_STATE, {
  [PayrollTypes.SET_CREATED]: setField('created', 'id'),
  [PayrollTypes.SET_RESULTS]: setField('results', 'results'),
  [PayrollTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [PayrollTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [PayrollTypes.SET_SELECTED]: setField('selected', 'id'),
  [PayrollTypes.SET_PAYEE_USER_TYPE]: setField('payeeUserType', 'userType'),
  [PayrollTypes.SET_SUMMARY]: setField('summary', 'summary')
});
