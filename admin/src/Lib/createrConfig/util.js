const os = require('os');
// 'Linux' on Linux
// 'Darwin' on macOS
// 'Windows_NT' on Windows
const systemType = os.type();

const e = (module.exports = {});
e.srcPath = path => '../../' + path;
e.fullUppercase = v =>
  v
    .match(/([A-Za-z][a-z]*)/g)
    .map(v => v.toUpperCase())
    .join('_');
e.capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

e.isWindows = systemType === 'Windows_NT';
