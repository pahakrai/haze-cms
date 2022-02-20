const {
  name: { uc }
} = require('../../constant');

const e = (module.exports = {});

e.point = `
// creater point`;
e.content = `
export { default as ${uc}FormPage } from './${uc}FormPage';
export { default as ${uc}Page } from './${uc}Page';`;
