import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const AC = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req.ac;
  }
);
