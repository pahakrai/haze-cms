const {
  name: { lc, uc },
  saga
} = require('../../constant');

const e = (module.exports = {});

e.reducer1 = {
  point: `
    })
  );`,
  content: `,
      ${lc}`
};
e.reducer2 = {
  point: `
const reducer = history =>`,
  content: `import ${lc} from './${uc}/reducers';\n`
};

e.saga1 = {
  point: `
export default function* root() {`,
  content: `import ${saga} from './${uc}/sagas';
import ${uc}Service from '../Services/APIServices/${uc}Service';
`
};

e.saga2 = {
  point: `
  ]);
}`,
  content: `,
    fork(${saga}, ${uc}Service)`
};
