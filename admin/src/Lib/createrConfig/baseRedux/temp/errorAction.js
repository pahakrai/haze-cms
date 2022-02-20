const {
  name: { uc }
} = require('../../constant');

const e = (module.exports = {});

e.point = `
  },
  { prefix: 'Error/' }`;
e.content = `,
    setGet${uc}sErrors: ['errors']\n`;
