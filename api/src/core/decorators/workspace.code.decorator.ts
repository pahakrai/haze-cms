import {createParamDecorator, ExecutionContext} from './utils';

export const WorkspaceCode = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.getRequest();

    return req.headers.workspace_code;
  }
);
