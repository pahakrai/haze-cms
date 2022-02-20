export const email = /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
// export const phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
export const phone = /^([0-9]-?){8}$/;

export const url = /^(http|https):\/\/([\w.]+\/?)\S*/;

export const code = /^[A-Za-z0-9-_]+$/;

export const dateYears = /^\d{4}-((0([1-9]))|(1(0|1|2)))$/;

export const getPhoneText = phoneRegionCode => {
  switch (phoneRegionCode) {
    case '+86':
      // china mainland
      return /^[1-9]{1}[0-9]{10}$/g;
    case '+852':
      // china hk
      return /^[0-9]{8}$/g;
    case '+81':
      // japan
      return /^[0-9]{10}$/g;
    case '+886':
      // taiwan
      return /^[0-9]{9}$/g;
    case '+82':
      // south korea
      return /^[0-9]{10}$/g;
    case '+1':
      // usa
      return /^[0-9]{10}$/g;
    case '+84':
      // vietnam
      return /^[0-9]{9}$/g;
    default:
      return /^[0-9]{10}$/g;
  }
};

export const isURL = str => {
  var urlRegex =
    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  var url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
};
