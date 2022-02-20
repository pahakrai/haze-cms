global.Intl = window.Intl = require('intl');

/**
 * Add locale string here to show in admin
 */
export const locales = ['en', 'zh-hk', 'zh-cn'];
// export const locales = ['en', 'zh-hk'];
// Make sure defaultLocale exists in locales
export const defaultLocale = 'en';

/**
 * handlers to import necessary locale files
 */
const localesObjs = { default: './default.json' };

locales.forEach(localeKey => {
  if (defaultLocale === localeKey) {
    localesObjs.default = require(`./default.json`);
  }
  localesObjs[localeKey.replace('-', '_')] = require(`./${
    'en' === localeKey ? 'default' : localeKey
  }.json`);
}, []);

export default localesObjs;
