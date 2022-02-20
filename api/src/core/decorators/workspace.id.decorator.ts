import {createParamDecorator, ExecutionContext} from './utils';

export const WorkspaceId = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.getRequest();

    return req.headers.workspace;
  }
);
