import {Injectable, NestMiddleware} from '@nestjs/common';
import {helpers} from '@golpasal/common';
import {Locale} from 'src/core/locale';

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const {headers} = req;
    const localeSettings = {
      default: process.env.LANGUAGE_DEFAULT,
      sources: [`${process.cwd()}/locales`],
      accept: {
        en: [],
        'zh-hk': ['tw', 'hant'],
        'zh-cn': ['sg', 'hans']
      }
    };
    const locale = new Locale(localeSettings);
    // get accept-language
    locale.renderAcceptLanguage(helpers.getLocale(headers['accept-language']));
    // set lcoale in req
    req.locale = locale;
    next();
  }
}
