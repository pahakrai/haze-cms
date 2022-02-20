import { createActions } from 'reduxsauce';

export const {
  Types: VehicleCategoryTypes,
  Creators: VehicleCategoryActions
} = createActions(
  {
    getVehicleCategories: ['opts'],
    getVehicleCategoryById: ['id'],
    createVehicleCategory: ['vehicleCategory', 'files'],
    updateVehicleCategory: ['id', 'vehicleCategory', 'files'],

    setResults: ['results'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm']
  },
  { prefix: 'VehicleCategory/' }
);
