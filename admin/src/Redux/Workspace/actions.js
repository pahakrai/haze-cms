import { createActions } from 'reduxsauce';

export const {
  Types: WorkspaceTypes,
  Creators: WorkspaceActions
} = createActions(
  {
    getWorkspaces: ['opts'],
    getWorkspaceById: ['id'],
    getWorkspaceByCode: ['code'],
    getWorkspaceContactId: ['workspaceId', 'contactId'],
    createWorkspaceContact: ['workspaceId', 'contact'],
    updateWorkspaceContact: ['workspaceId', 'contact'],
    deleteWorkspaceContact: ['workspaceId', 'contactId'],
    createWorkspace: ['workspace', 'files'],
    updateWorkspace: ['workspace', 'files'],
    currentWorkspace: ['opts'],
    getAllWorkspace: ['query', 'refresh'],

    setResults: ['results'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm'],
    toggleActive: ['id', 'active'],
    updateWorkspaceContactIsPrimary: ['workspaceId', 'contactId', 'isPrimary'],
    mergeAllResults: ['allResults'],
    setAllResults: ['allResults']
  },
  { prefix: 'Workspace/' }
);
