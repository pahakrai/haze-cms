import { createActions } from 'reduxsauce';

export const { Types: CourierTypes, Creators: CourierActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getCouriers: ['opts'],
    getCourierById: ['id'],
    updateCourier: ['formValues'],
    createCourier: ['formValues'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Courier/' }
);
