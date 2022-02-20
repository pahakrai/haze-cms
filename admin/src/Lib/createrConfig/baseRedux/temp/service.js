const { name, api, apiName, uploadFile } = require('../../constant');

const e = (module.exports = {});

const create_update_service = uploadFile
  ? `
const create${name.uc} = (formValues, files, onUploadProgress) => {
  const opts = {};
  let data = formValues;
  if (files) {
    data = new FormData();
    files.forEach(f => data.append(\`files\`, f));
    opts.onUploadProgress = onUploadProgress;
    data.append('${name.lc}', JSON.stringify(formValues));
  }
  return ${api}.post(\`/${apiName}\`, data, opts);
};

const update${name.uc} = (formValues, files, onUploadProgress) => {
  const opts = {};
  let data = formValues;
  if (files) {
    data = new FormData();
    files.forEach(f => data.append(\`files\`, f));
    opts.onUploadProgress = onUploadProgress;
    data.append('${apiName}', JSON.stringify(formValues));
  }
  return ${api}.put(\`/${apiName}/\` + formValues._id, data, opts);
};`
  : `
const create${name.uc} = formValues => {
  return ${api}.post(\`/${apiName}\`, formValues);
};

const update${name.uc} = formValues => {
  return ${api}.put(\`/${apiName}/\` + formValues._id, formValues);
};`;

e.content = `
import { ${api} } from '../APIs';
import { serialize } from './ServiceUtils';

const get${name.ucs} = opts => {
  return ${api}.get('/${apiName}?' + serialize(opts));;
};

const get${name.uc}ById = id => {
  return ${api}.get('/${apiName}/' + id);;
};
${create_update_service}

export default {
  self: ${api},
  create${name.uc},
  get${name.uc}ById,
  get${name.ucs},
  update${name.uc}
};
`.replace(/^\s/, '');
