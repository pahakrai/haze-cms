import {createParamDecorator, ExecutionContext} from './utils';

export const UTCOffset = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.getRequest();

  return req.headers.utcoffset
    ? parseInt(req.headers.utcoffset as string, 10)
    : 0;
});
