import { createActions } from 'reduxsauce';

export const { Types: TunnelTypes, Creators: TunnelActions } = createActions(
  {
    getTunnels: ['opts'],
    getAllTunnel: ['opts'],
    getTunnelById: ['id'],
    createTunnel: ['tunnel', 'iconFiles', 'iconActiveFiles'],
    updateTunnel: ['tunnel', 'iconFiles', 'iconActiveFiles'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm']
  },
  { prefix: 'TunnelTypes/' }
);
