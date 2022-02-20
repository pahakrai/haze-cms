import { createActions } from 'reduxsauce';

export const { Types: AppHookTypes, Creators: AppHookActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getAppHookByName: ['name'],
    getAllAppHook: [],
    getAllAppHookName: [],

    setResults: ['results'],
    setNameResults: ['nameResults'],
    setAllResults: ['allResults'],
    mergeAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id']
  },
  { prefix: 'AppHook/' }
);
