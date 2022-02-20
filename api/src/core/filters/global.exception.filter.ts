import {ExceptionFilter, Catch, HttpException} from '@nestjs/common';

import {isArray} from 'util';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: any) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    // const a = ctx.args.length > 0 ? ctx.args[0].originalUrl : '';
    const error = {
      statusCode: 500,
      message: 'Internal server error',
      url: ctx.args.length > 0 && ctx.args[0] ? ctx.args[0].originalUrl : ''
    };
    console.error('exception', exception);

    if (exception instanceof Error) {
      if (exception instanceof HttpException) {
        error.statusCode = exception.getStatus();
        const response = exception.getResponse() as any;
        error.message = response.message ? response.message : response;
      } else if (exception.name === 'ValidationError') {
        error.message = exception.message;
      } else {
        // default Error
        error.message = exception.message;
      }
    }

    if (isArray(exception)) {
      error.statusCode = 400;
      error.message = exception as any;
    }
    if (res && res.status) {
      res.status(error.statusCode).json(error);
    }
  }
}
