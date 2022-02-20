import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { setField } from '../utils/reducer';
import { PhoneRegionTypes } from './actions';

export const INITIAL_STATE = Immutable({
  all: []
});

const setAllPhoneRegions = setField('all', '_ids');

export default createReducer(INITIAL_STATE, {
  [PhoneRegionTypes.SET_ALL_PHONE_REGIONS]: setAllPhoneRegions
});
