import { createActions } from 'reduxsauce';

export const { Types: VehicleTypes, Creators: VehicleActions } = createActions(
  {
    // sage
    getVehicles: ['opts'],
    getVehiclesWithAll: ['opts'],
    createVehicle: ['opts', 'jobId'],
    updateVehicle: ['opts'],
    getVehicleById: ['id', 'opts'],
    deleteVehicle: ['id', 'pageType'],
    searchSelectVehicles: ['opts', 'q'],
    updateVehiclePreference: ['id', 'services'],
    // reducers
    setResults: ['results'],
    setSearchSelectResults: ['searchSelectResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'Vehicle/' }
);
