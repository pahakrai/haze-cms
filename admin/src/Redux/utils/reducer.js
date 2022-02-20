// import update from 'immutability-helper'
import * as R from 'ramda';
import { setArray, getFieldVal } from './index';
import Immutable from 'seamless-immutable';

export const mergeArray = (field, payloadField = '_ids') => (state, payload) =>
  Immutable.updateIn(state, setArray(field), arr =>
    arr.concat(R.difference(payload[payloadField], arr))
  );

// if payloadField is a string, it'll fetch payload's field as set
// if payloadField is an object, set object.value
export const setField = (field, payloadField) => (state, payload) =>
  state.setIn(
    setArray(field),
    typeof payloadField === 'object'
      ? payloadField.value
      : payload[payloadField || field]
  );

export const resetField = initialState => (state, { field }) =>
  setField(field, { value: getFieldVal(initialState, field) })(state);

export const toggleField = (field, payloadField = 'isView') => (
  state,
  payload
) => {
  const payloadFieldVal = payload[payloadField];
  const isTrue =
    payloadFieldVal !== undefined
      ? payloadFieldVal
      : !getFieldVal(state, field);
  return state.setIn(setArray(field), isTrue);
};

export const mergeIds = (field, payloadField = '_ids') =>
  mergeArray(field, payloadField);

export const setId = field => setField(field, '_id');

export const reset = initialState => () => initialState;
