import { createActions } from 'reduxsauce';

export const {
  Types: SystemReportTypes,
  Creators: SystemReportActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getSystemReports: ['opts'],
    getReportsWorkspaceAllowToAccess: ['opts'],
    getSystemReportById: ['id'],
    updateSystemReport: ['formValues'],
    createSystemReport: ['formValues'],
    getSystemReportByParameter: ['url', 'parameters'],
    getSystemReportByName: ['reportName', 'format', 'parameters'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeAllResults: ['allResults']
  },
  { prefix: 'SystemReport/' }
);
