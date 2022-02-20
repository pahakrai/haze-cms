import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
// import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {ResponseHelper} from '../utils';

@Injectable()
export class MapDisplayLocalizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const requestLanguage =
      request.headers['accept-language'] ||
      process.env.LANGUAGE_DEFAULT ||
      'en';

    return next.handle().pipe(
      map(data => {
        if (
          request.query.localize === '' ||
          request.query.localize === 'true'
        ) {
          data = ResponseHelper._mapToDisplay(data, requestLanguage);
        }
        return data;
      })
    );
  }
}
