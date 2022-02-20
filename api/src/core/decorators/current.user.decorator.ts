import {createParamDecorator, ExecutionContext} from './utils';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.getRequest();

    return req.user;
  }
);
