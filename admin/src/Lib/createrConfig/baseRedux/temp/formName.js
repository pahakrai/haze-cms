const {
  name: { fu }
} = require('../../constant');

const e = (module.exports = {});

e.point = `
};`;
e.content = `,
  ${fu}_CREATE: '${fu.toLowerCase()}_create',
  ${fu}_UPDATE: '${fu.toLowerCase()}_update'`;
