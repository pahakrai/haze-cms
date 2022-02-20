import {GqlExecutionContext} from '@nestjs/graphql';
import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const GqlCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = GqlExecutionContext.create(ctx).getContext().req;

    return req.user;
  }
);
