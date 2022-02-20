import { createSelector } from 'reselect';

export const getCategoryPins = createSelector(
  state => state.category.categoryPinsResults,
  state => state.resources.categoryPins,
  (keys, menu) => keys && Array.isArray(keys) && keys.map(key => menu[key])
);
