import { createActions } from 'reduxsauce';

export const { Types: LogTypes, Creators: LogActions } = createActions(
  {
    getLogs: ['opts'],
    getLogById: ['id'],

    mergeResults: ['results'],
    setResults: ['results'],
    setSelected: ['id']
  },
  { prefix: 'Log/' }
);
