// eslint-disable-next-line
export const PATTERN_SANITIZE_LOGIN_INPUT = /[\^<>()[\]{}\\/,;:%$#&*?\s=~`'"!]/g;
export const PATTERN_SANITIZE_USERNAME = /[\^<>()[\]{}\\/,;:%$#&*?\s=~`'"\s!]/g;
export const PATTERN_SANITIZE_EMAIL_DOMAIN = /@.*$/;

export const WEB_URL_PATTERN = /^((http|https):\/\/)/;

export const prepareUrl = (url: string, secure?: boolean) => {
  if (!WEB_URL_PATTERN.test(url)) {
    url = (secure ? 'https://' : 'http://') + url;
  }
  return url;
};
