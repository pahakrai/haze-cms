import { createActions } from 'reduxsauce';

export const {
  Types: VehicleModelTypes,
  Creators: VehicleModelActions
} = createActions(
  {
    // sagas
    getVehicleModels: ['opts'],
    createVehicleModel: ['opts', 'jobId'],
    updateVehicleModel: ['id', 'opts'],
    getVehicleModelById: ['id', 'query'],
    getAllVehicleModel: ['opts'],
    // reducers
    setAllResults: ['allResults'],
    setResults: ['results'],
    mergeResults: ['results'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'VehicleModel/' }
);
