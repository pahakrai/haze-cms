import { createActions } from 'reduxsauce';

export const {
  Types: WorkspacePhoneRegionsTypes,
  Creators: WorkspacePhoneRegionActions
} = createActions(
  {
    getWorkspacePhoneRegions: ['opts'],
    createWorkspacePhoneRegion: ['formValues'],
    updateWorkspacePhoneRegion: ['formValues'],
    deleteWorkspacePhoneRegion: ['id'],
    getWorkspacePhoneRegionById: ['id'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'WorkspacePhoneRegions/' }
);

export default WorkspacePhoneRegionActions;
