import requireDir from 'require-dir';

export interface LocaleConfig {
  sources?: string[];
  default?: string;
  accept?: {[lang: string]: string[]};
}

export class Locale {
  private config: any;
  private currentLanguage: string;
  private sources: any;

  constructor(config: LocaleConfig = {}) {
    this.setConfig(config);
  }

  getLanguage = (): string => {
    return this.currentLanguage;
  };

  getDefaultLanguage = (): string => {
    return this.config?.default || process.env.LANGUAGE_DEFAULT;
  };

  getAvailableLanguages = (): string[] => {
    return Object.keys(this.config.accept);
  };

  setCurrentLanguage = (lang: string): boolean => {
    // TODO:: probably should throw error instead of return boolean
    if (this.isValidLanguageCode(lang)) {
      this.currentLanguage = this.sanitizeCode(lang);
      return true;
    } else {
      return false;
    }
  };

  renderAcceptLanguage = (
    acceptLanguage = '',
    defaultLanguage: string = this.config.default
  ): void => {
    let isLanguageSet = false;
    if (acceptLanguage) {
      const acceptLanguages = acceptLanguage.split(',');
      const languages = acceptLanguages
        .map(acceptLangSettings => {
          let q = 1;
          const acceptLangSettingParts = acceptLangSettings.split(';');
          const code = acceptLangSettingParts[0];
          acceptLangSettingParts.forEach(alPart => {
            const [cmd, val] = alPart.split('=');
            switch (cmd) {
              case 'q':
                if (!isNaN(parseInt(val, 10))) {
                  q = Number(val);
                }
                break;
              default:
                break;
            }
          });
          return {code, q};
        })
        .sort((a, b) => b.q - a.q);

      isLanguageSet =
        languages.find(
          lang =>
            this.isValidLanguageCode(lang.code) &&
            this.setCurrentLanguage(lang.code)
        ) !== null;
    }
    if (!isLanguageSet) {
      this.setCurrentLanguage(defaultLanguage);
    }
  };

  sanitizeCode = (code: string): string => {
    const {accept} = this.config;

    if (accept[code]) {
      return code;
    } else {
      return Object.keys(accept).find(
        langKey => accept[langKey].indexOf(code) > -1
      );
    }
  };

  isValidLanguageCode = (code: string): boolean => {
    const {accept} = this.config;

    return (
      Boolean(accept[code]) ||
      Object.keys(accept).find(
        langKey => accept[langKey].indexOf(code) > -1
      ) !== null
    );
  };

  setConfig = (config: LocaleConfig = {}): void => {
    // 给出默认值。 这样就可以在项目的任何地方new 出一个Locale instance， 以便可以使用到Locale.translate 方法
    config.sources = config.sources || [`${process.cwd()}/locales`];
    config.default = config.default || process.env.LANGUAGE_DEFAULT;
    config.accept = config.accept || {
      en: [],
      vi: []
    };

    this.config = Object.assign({}, this.config, config);
    if (!this.getLanguage()) {
      this.setCurrentLanguage(config.default);
    }
    if (this.config.sources) {
      // source could be one of the following:
      //    string, object, array (of string or object)
      const {sources} = this.config;
      if (Array.isArray(sources)) {
        const result = {};
        sources.forEach(source => {
          if (typeof source === 'object') {
            Object.keys(source).forEach(oKey => {
              result[oKey] = Object.assign({}, result[oKey], source[oKey]);
            });
          } else if (typeof source === 'string') {
            try {
              const obj = requireDir(source, {recurse: true});
              Object.keys(obj).forEach(oKey => {
                result[oKey] = Object.assign({}, result[oKey], obj[oKey]);
              });
            } catch (error) {
              throw new Error(error);
            }
          } else {
            throw new Error('invalid locale sources');
          }
        });
        this.sources = result;
      } else if (typeof sources === 'object') {
        this.sources = sources;
      } else if (typeof sources === 'string') {
        this.sources = requireDir(this.config.path, {recurse: true});
      } else {
        throw new Error('invalid locale sources');
      }
    }
  };

  tAll = (word: string, args?: string[]): {[lang: string]: string} => {
    const result = {};
    Object.keys(this.config.accept).forEach(
      lang => (result[lang] = this.t(word, args, lang))
    );
    return result;
  };

  t = (word: string, args?: string[], l?: string): string => {
    return this.translate(
      l || this.currentLanguage || this.config.default,
      word,
      args
    );
  };

  translate = (lang: string, word: string, args: string[] = []): string => {
    if (this.sources[lang]) {
      return this.stringFormat(this.sources[lang][word] || word, args);
    }
    return '';
  };

  stringFormat = (string = '', args: string[] = []): string => {
    return string.replace(/(\{\d+\})/g, a => {
      return args[Number(a.substr(1, a.length - 2)) || 0];
    });
  };
}
