import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ParamTypes } from './actions';
import { setField } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  result: {},
  navigationsResult: {},
  edmTemplates: {},
  languages: {},
  defaultAvatar: {}
});

export default createReducer(INITIAL_STATE, {
  [ParamTypes.SET_NAVIGATIONS_RESULT]: setField('navigationsResult'),
  [ParamTypes.SET_RESULT]: setField('result'),
  [ParamTypes.SET_EDM_TEMPLATES]: setField('edmTemplates', 'edmTemplates'),
  [ParamTypes.SET_LANGUAGES]: setField('languages', 'languages'),
  [ParamTypes.SET_DEFAULT_AVATAR]: setField('defaultAvatar', 'defaultAvatar')
});
