import { createActions } from 'reduxsauce';

export const { Types: DriverTypes, Creators: DriverActions } = createActions(
  {
    // sage
    getDrivers: ['opts'],
    getDriversWithAll: ['opts'],
    createDriver: ['opts', 'files'],
    updateDriver: ['opts', 'files'],
    getDriverById: ['id', 'opts'],
    deleteDriver: ['id', 'pageType'],
    getDriverByUserId: ['userId', 'opts'],
    // reducers
    setResults: ['results'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'Driver/' }
);

export default DriverActions;
