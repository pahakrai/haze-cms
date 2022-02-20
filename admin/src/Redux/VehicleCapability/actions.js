import { createActions } from 'reduxsauce';

export const {
  Types: VehicleCapabilityTypes,
  Creators: VehicleCapabilityActions
} = createActions(
  {
    // sagas
    getVehicleCapabilities: ['opts'],
    createVehicleCapability: ['opts', 'jobId'],
    updateVehicleCapability: ['id', 'opts'],
    getVehicleCapabilityById: ['id'],
    getAllVehicleCapability: ['opts'],
    // reducers
    setAllResults: ['allResults'],
    setResults: ['results'],
    mergeResults: ['results'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'VehicleCapability/' }
);
