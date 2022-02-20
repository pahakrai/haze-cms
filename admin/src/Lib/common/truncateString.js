const getStringLen = str => {
  let len = 0;
  for (let i = 0; i < (str || '').length; i++) {
    str.charCodeAt(i) > 255 ? (len += 2) : (len += 1);
  }
  return len;
};
const getStringIndex = (str, index) => {
  let len = 0;
  for (let i = 0; i < (str || '').length; i++) {
    str.charCodeAt(i) > 255 ? (len += 2) : (len += 1);
    if (len > index) {
      return i;
    }
  }
  return 0;
};
export const truncateString = (str, len, trailing = '') =>
  getStringLen(str) > len
    ? str.slice(0, getStringIndex(str, len)) + trailing
    : str;

export default truncateString;
