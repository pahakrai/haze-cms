import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost
} from '@nestjs/common';
import Polyglot from 'node-polyglot';

import map from 'lodash/map';
// import keys from 'lodash/keys';

import {LocalStore} from '../locale';
import {HttpStatus} from '../constants';

@Catch(HttpException) // only catch http exception
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    // init localstore and ployglot
    const localStore = new LocalStore();
    const parser = localStore.getParser(req.locale.currentLanguage);
    const polyglot = new Polyglot({phrases: parser});

    // const locale: Locale = req.locale;
    const status = exception.getStatus();

    if (status === HttpStatus.INVALIDATE) {
      const exceptionErrors: any = exception.getResponse();
      const errorMessages = map(exceptionErrors, err => {
        const payloadKeys = Object.keys(err.payload || {});
        if (payloadKeys.length) {
          payloadKeys.forEach((key, index) => {
            err.payload[key] = polyglot.t(err.payload[payloadKeys[index]]);
          });
        }
        const message = err.code
          ? polyglot.t(err.code, err.payload)
          : err.value;

        return {[err.fieldName]: message};
      });

      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation Error',
        errors: errorMessages,
        path: req.url
      });
    } else {
      let errorMessage = exception.message;
      const {code, payload = {}, field} = exception.getResponse() as any;
      if (code) {
        const payloadKeys = Object.keys(payload);
        if (payloadKeys.length) {
          payloadKeys.forEach((key, index) => {
            if (key === 'value') {
              payload[key] = payload[payloadKeys[index]];
            } else payload[key] = polyglot.t(payload[payloadKeys[index]]);
          });
        }
        errorMessage = polyglot.t(code, payload);
      }
      const resultJson: any = {
        statusCode: status,
        message: errorMessage,
        path: req.url
      };
      if (field) {
        resultJson.errors = [
          {
            [field]: errorMessage
          }
        ];
      }

      res.status(status).json(resultJson);
    }
  }
}
