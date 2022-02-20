import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { UserCreditTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  credits: {},
  creditList: {}
});

/* ------------- Reducers ------------- */
const setCredit = (state, { uid, credit }) => {
  return Immutable.setIn(state, ['credits', uid], credit);
};
const deleteCredit = (state, { uid }) => {
  return Immutable.setIn(state, ['credits', uid], null);
};
const setCredits = (state, { uid, credits }) => {
  return Immutable.setIn(state, ['creditList', uid], credits);
};
/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [UserCreditTypes.SET_CREDITS]: setCredits,
  [UserCreditTypes.SET_CREDIT]: setCredit,
  [UserCreditTypes.DELETE_CREDIT]: deleteCredit,
  [UserCreditTypes.SET_RESULTS]: setField('results', 'results'),
  [UserCreditTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
