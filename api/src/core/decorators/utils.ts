import {
  createParamDecorator as _createParamDecorator,
  ExecutionContext as _ExecutionContext
} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';
import {Request} from 'express';

export type ExecutionContext = _ExecutionContext & {getRequest: () => Request};

export const getRestfulRequest = (ctx: ExecutionContext): Request => {
  return ctx.switchToHttp().getRequest();
};

export const getGraphqlRequest = (ctx: ExecutionContext): Request => {
  if (ctx?.['contextType'] !== 'graphql') return null;
  return GqlExecutionContext.create(ctx).getContext().req;
};

export const getCrossEndpointRequest = (ctx: ExecutionContext): Request => {
  return getGraphqlRequest(ctx) || getRestfulRequest(ctx);
};

export const createParamDecorator = (
  fn: (data: unknown, ctx: ExecutionContext) => void
) =>
  _createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    return fn(data, {...ctx, getRequest: () => getCrossEndpointRequest(ctx)});
  });
