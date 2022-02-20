import { createActions } from 'reduxsauce';

export const {
  Types: VehicleMakeTypes,
  Creators: VehicleMakeActions
} = createActions(
  {
    // sagas
    getVehicleMakes: ['opts'],
    createVehicleMake: ['opts', 'jobId'],
    updateVehicleMake: ['id', 'opts'],
    getVehicleMakeById: ['id'],
    getAllVehicleMake: ['opts'],
    // reducers
    setAllResults: ['allResults'],
    setResults: ['results'],
    mergeResults: ['results'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'VehicleMake/' }
);
