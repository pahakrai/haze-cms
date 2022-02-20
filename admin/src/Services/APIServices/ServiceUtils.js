const serializeFormatParam = (name, value) =>
  encodeURIComponent(name) + '=' + encodeURIComponent(value);

export const serialize = function (obj) {
  var str = [];
  const arrayParamFormat = v => {
    str.push(serializeFormatParam(`${p}[]`, v));
  };
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p] !== undefined) {
      if (Array.isArray(obj[p])) {
        obj[p].forEach(arrayParamFormat);
      } else {
        str.push(serializeFormatParam(p, obj[p]));
      }
    }
  return str.join('&');
};
