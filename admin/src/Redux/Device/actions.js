import { createActions } from 'reduxsauce';

export const { Types: DeviceTypes, Creators: DeviceActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getDevices: ['opts'],
    getAllDevice: ['opts'],
    updateDevice: ['formValues'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id']
  },
  { prefix: 'Device/' }
);
