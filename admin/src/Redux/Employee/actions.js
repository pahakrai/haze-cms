import { createActions } from 'reduxsauce';

export const {
  Types: EmployeeTypes,
  Creators: EmployeeActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getEmployee: ['opts'],
    getEmployees: ['opts'],
    getEmployeeById: ['id'],
    getEmployeeByUserId: ['userId'],
    updateEmployee: ['formValues'],
    createEmployee: ['formValues'],
    searchEmployees: ['opts'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setSearchResults: ['searchResults'],
    mergeSearchResults: ['searchResults']
  },
  { prefix: 'Employee/' }
);
