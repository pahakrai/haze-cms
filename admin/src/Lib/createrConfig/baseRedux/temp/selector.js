const {
  name: { lc, uc },
  resourceReducer
} = require('../../constant');

const e = (module.exports = {});

e.hydrate = {
  point: `
// creater hydrate point`,
  content: `
export const ${lc}Hydrate = createHydrate('${lc}');
export const ${lc}HydrateAll = createHydrateAll('${lc}');
`
};

e.selector = {
  point: `
// creater file end point`,
  content: `
export const get${uc}ById = (state, _id, opts) => {
  const { populate = true } = opts || {};
  if (populate) {
    return ${lc}Hydrate(() => _id)(state);
  } else {
    return state.resources.${resourceReducer}[_id];
  }
};
export const get${uc}s = ${lc}HydrateAll(
  state => state.${lc}.results
);
`
};
