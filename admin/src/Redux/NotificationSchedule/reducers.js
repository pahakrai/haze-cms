import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { NotificationScheduleTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  searchResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [NotificationScheduleTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [NotificationScheduleTypes.SET_RESULTS]: setField('results', 'results'),
  [NotificationScheduleTypes.SET_SEARCH_RESULTS]: setField(
    'searchResults',
    'results'
  ),
  [NotificationScheduleTypes.SET_CREATED]: setField('created', 'id'),
  [NotificationScheduleTypes.SET_SEARCH_TERM]: setField(
    'searchTerm',
    'searchTerm'
  ),
  [NotificationScheduleTypes.SET_SELECTED]: setField('selected', 'id'),
  [NotificationScheduleTypes.SET_NOTIFICATION_SCHEDULE_FORM]: setField(
    'notificationScheduleForm',
    'notificationScheduleForm'
  )
});
