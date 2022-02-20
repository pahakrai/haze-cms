import * as R from 'ramda';

import { hydrate, hydrateAll } from '../../Services/Schemas';

import { createSelector } from 'reselect';

export const _getResources = state => state.resources;
export const createHydrate = R.curry((fieldName, stateIdFn) =>
  createSelector([_getResources, stateIdFn], (resources, id) =>
    hydrate(fieldName, id, resources)
  )
);

export const createHydrateAll = R.curry(
  (fieldName, stateIdsFn, filter = n => n) => {
    return createSelector([_getResources, stateIdsFn], (resources, ids) => {
      return R.filter(filter, hydrateAll(fieldName, ids, resources));
    });
  }
);
