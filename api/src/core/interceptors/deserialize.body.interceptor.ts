import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import {Observable} from 'rxjs';
// import * as _ from 'lodash';
import {map} from 'rxjs/operators';
@Injectable()
export class DeserializeBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request && Object.keys(request.body).length) {
      const keys = Object.keys(request.body);
      const filesKey = keys.indexOf('files');
      if (filesKey >= 0) {
        keys.splice(filesKey, 1);
      }
      try {
        request.body = JSON.parse(request.body[keys[0]]);
      } catch (error) {}
    }
    return next.handle().pipe(map(data => data));
  }
}
