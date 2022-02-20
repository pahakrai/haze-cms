import {createParamDecorator, ExecutionContext} from './utils';

export const Platform = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.getRequest();

  return req.headers.platform ? req.headers.platform : null;
});
