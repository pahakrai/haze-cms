import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PostCommentTypes } from './actions';
import { mergeArray, setField } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  deleted: null
});

/* ------------- Reducers ------------- */
const deleteResultId = (state, action) => {
  const results = state.results.filter(_id => _id !== action.id);
  return state.setIn(['results'], results);
};

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [PostCommentTypes.SET_RESULT_IDS]: setField('results', '_ids'),
  [PostCommentTypes.MERGE_RESULT_IDS]: mergeArray('results', '_ids'),
  [PostCommentTypes.DELETE_RESULT_ID]: deleteResultId
});
