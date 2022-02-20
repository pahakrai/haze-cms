import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// import { FollowerTypes } from './actions';
// import { setField } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: []
});

export default createReducer(INITIAL_STATE, {});
