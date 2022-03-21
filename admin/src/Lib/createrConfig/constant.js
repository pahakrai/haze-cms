const { capitalize, fullUppercase, isWindows } = require('./util.js')

const e = (module.exports = { isWindows })

//  TEST
// e.name = {
//   lc: 'streetRoute', // lowercase
//   uc: 'StreetRoute', // uppercase
//   fu: 'STREET_ROUTE' // full uppercase
// };

// Modify this line
// The first letter is lowercase unless you want it to be capitalized
const name = 'benefit'

e.name = {
  lc: name, // lowercase
  uc: capitalize(name), // uppercase
  fu: fullUppercase(name) // full uppercase
}

e.name = {
  ...e.name,
  lcs: e.name.lc + 's',
  ucs: e.name.uc + 's',
  fus: e.name.uc + 'S'
}

e.type = `${e.name.uc}Types`
e.action = `${e.name.uc}Actions`
e.schema = `${e.name.lc}Schema`
e.service = `${e.name.uc}Services`
e.saga = `${e.name.uc}Sagas`
e.api = 'hazeApi'
e.apiName = e.name.lcs
e.paginate = e.name.lcs
e.resourceReducer = e.name.lc
e.uploadFile = false // has file field

// temp
// const temp_lc = 'template_0000_1'; // lowercase
// const temp_uc = 'TEMPLEAT_0000_2'; // uppercase
// const temp_fu = 'template_0000_3'; // full uppercase
// const temps_lc = 'templates_0000_4';
// const temps_uc = 'templates_0000_5';
// const temps_fu = 'templates_0000_6';
