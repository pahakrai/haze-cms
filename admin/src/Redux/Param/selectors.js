import { createSelector } from 'reselect';

export const getMobileURINavigationOptions = createSelector(
  state => state.resources.paramMobileNavigations,
  state => state.param.navigationsResult,
  (paramMobileNavigations, keys) =>
    (keys &&
      Array.isArray(keys) &&
      keys.map(key => paramMobileNavigations[key])) ||
    []
);
