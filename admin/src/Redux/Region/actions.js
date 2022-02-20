import { createActions } from 'reduxsauce';

export const { Types: RegionTypes, Creators: RegionActions } = createActions(
  {
    getRegions: ['query'],
    getRegionPins: null,
    getAllRegionsWithChildren: null,
    createRegion: ['formValues', 'files'],
    updateRegion: ['formValues', 'files'],
    deleteRegion: ['id'],
    deleteRegionPin: ['id'],
    createRegionPin: ['regionPin'],
    updateRegionPin: ['regionPin'],
    getAllRegion: ['query', 'refresh'],
    getRegionById: ['id'],
    getAllDistrict: null,
    // reducers
    setResults: ['results'],
    setRegionPins: ['_ids'],
    setRegionsWithChildrenResult: ['results'],
    mergeRegionPins: ['_ids'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    deleteResultId: ['id'],
    setSearchTerm: ['searchTerm'],
    setExpanded: ['region', 'isExpanded'],
    mergeAllResults: ['allResults'],
    setAllDistrict: ['allDistrict'],
    setAllResults: ['allResults'],
    resetExpanded: null,
    reset: null
  },
  { prefix: 'Region/' }
);
