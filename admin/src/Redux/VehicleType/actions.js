import { createActions } from 'reduxsauce';

export const {
  Types: VehicleTypeTypes,
  Creators: VehicleTypeActions
} = createActions(
  {
    // sagas
    getVehicleTypes: ['opts'],
    createVehicleType: ['vehicleType', 'iconFiles', 'iconActiveFiles'],
    updateVehicleType: ['id', 'vehicleType', 'iconFiles', 'iconActiveFiles'],
    getVehicleTypeById: ['id'],
    getAllVehicleType: ['opts'],
    getAllVehicleTypes: ['query', 'refresh'],
    // reducers
    setAllResults: ['allResults'],
    setResults: ['results'],
    mergeResults: ['results'],
    mergeAllResults: ['allResults'],
    setSelected: ['id'],
    setCreated: ['id'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'VehicleType/' }
);
