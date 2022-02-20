import { createSelector } from 'reselect';

export const getRegionPins = createSelector(
  state => state.region.regionPinsResults,
  state => state.resources.regionPins,
  (keys, menu) => keys && Array.isArray(keys) && keys.map(key => menu[key])
);
