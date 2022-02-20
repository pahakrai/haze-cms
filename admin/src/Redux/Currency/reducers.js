import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { CurrencyTypes } from './actions';
import { setField } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: []
});

export default createReducer(INITIAL_STATE, {
  [CurrencyTypes.SET_RESULTS]: setField('results', 'results')
});
