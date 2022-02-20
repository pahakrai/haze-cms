import { createActions } from 'reduxsauce';

export const {
  Types: FileMetaTypes,
  Creators: FileMetaActions
} = createActions(
  {
    getFileMetas: ['query'],
    createFileMeta: ['fileMeta', 'files'],
    getFileMetaById: ['id'],
    deleteFileMeta: ['id'],
    updateFileMeta: ['fileMeta', 'files'],
    getAllSvgFileMeta: null,
    findFileMetas: ['opts'],

    setResults: ['results'],
    setSearchTerm: ['searchTerm'],
    setSelected: ['id'],
    setDeleted: ['id']
  },
  { prefix: ' FileMeta/' }
);
