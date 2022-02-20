import {GqlExecutionContext} from '@nestjs/graphql';
import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const GqlWorkspaceId = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = GqlExecutionContext.create(ctx).getContext().req;

    return req.headers.workspace;
  }
);
