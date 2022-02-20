/**
 * for server.js match path , render dynamic-page
 */

const mem = require("mem");
const cleanPath = (path) => {
  // clean the path so:
  //    1. never be trailing /
  //    2. always start with /
  let pathCleaned = (path || "").replace(/\/$/, "");
  if (pathCleaned[0] !== "/") {
    pathCleaned = `/${pathCleaned}`;
  }
  return pathCleaned;
};

const structurePaths = (paths) => {
  return paths.map((path) => {
    // clean the path so:
    //    1. never be trailing /
    //    2. always start with /
    let pathCleaned = cleanPath(path);
    // get all the params expected from this field
    let fields = pathCleaned.match(new RegExp(/\/:([^\/\?]*)\??/, "g"));
    fields = fields
      ? fields.map((m) => m.replace("/:", "").replace("?", ""))
      : [];
    // regex to testing path against
    const regex = new RegExp(
      `^${pathCleaned.replace(/\/:[^\/\?]*\??/g, (x) => {
        const isOptional = /\?$/.test(x);
        // let returningRegex = '\/([^\/]*)';
        return `(\/([^\/]*))${isOptional ? "?" : ""}`;
      })}$`
    );
    return {
      path,
      regex,
      fields,
    };
  });
};

const matchPath = (path, paths) => {
  // clean the path so:
  //    1. never be trailing /
  //    2. always start with /
  let pathCleaned = cleanPath(path);
  // see if any paths match the path coming in
  const pathFound = paths.find((o) => o.regex.test(pathCleaned));
  // if none matched, just return current return object
  const matched = !!pathFound;
  if (!matched) {
    return { matched: false };
  }
  // find all matches based on matched path regex
  const matches = pathCleaned.match(pathFound.regex);
  // remove first one, which is the whole string
  matches.shift();
  // go through each matches (remove any undefined),
  // and append each value into the fieldsObj with related
  // fieldName
  fields = matches
    .filter((m) => m)
    .reduce((fieldsObj, matchValue) => {
      // if value starts with /, we can exclude it
      if (/^\//.test(matchValue)) {
        return fieldsObj;
      }
      // get the length of current fieldsObj keys as
      // our next field index
      const fieldsIndex = Object.keys(fieldsObj).length;
      // store field + value into fieldsObj
      fieldsObj[pathFound.fields[fieldsIndex]] = matchValue;
      // return updated fieldsObj
      return fieldsObj;
    }, {});
  // return final object
  return { matched, fields, path: pathFound.path };
};

module.exports = (() => {
  const memoizedStructure = mem(structurePaths);
  return {
    matchPath: (verifyPath, paths) => {
      const structurePaths = memoizedStructure(paths);
      return matchPath(verifyPath, structurePaths);
    },
  };
})();
