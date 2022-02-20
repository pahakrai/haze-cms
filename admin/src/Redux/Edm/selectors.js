import { createSelector } from 'reselect';

export const getEdms = createSelector(
  state => state.resources.edms,
  state => state.edm.results,
  (edms, keys) =>
    (keys && Array.isArray(keys) && keys.map(key => edms[key])) || []
);
