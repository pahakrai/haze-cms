const {
  schema,
  name: { lc }
} = require('../../constant');

const e = (module.exports = {});

e.point = 'export const hydrate';
e.content = `entities.${schema} = Entity('${lc}');\n\n`;
