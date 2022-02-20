import {createParamDecorator, ExecutionContext} from './utils';

export const LocaleDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req: any = ctx.getRequest();

    return req.locale;
  }
);
