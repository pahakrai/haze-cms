const {
  name: { uc, ucs },
  type,
  action,
  uploadFile
} = require('../../constant');

const e = (module.exports = {});

e.content = `
import { createActions } from 'reduxsauce';

export const { Types: ${type}, Creators: ${action} } = createActions(
  {
    /* ------------- Sagas ------------- */
    get${ucs}: ['opts'],
    get${uc}ById: ['id'],
    update${uc}: ['formValues'${uploadFile ? ", 'files'" : ''}],
    create${uc}: ['formValues'${uploadFile ? ", 'files'" : ''}],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: '${uc}/' }
);
`.replace(/^\s/, '');
