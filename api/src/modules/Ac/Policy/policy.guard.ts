import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ACService} from '../ac.service';
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    if (!req?.user?._id) return false;
    const ac: ACService = req.ac;
    const policies: string[] = this.reflector.get<string[]>(
      'policies',
      context.getHandler()
    );
    // check access use ac and policy
    return ac.areAllowed(
      req.user.currentWorkspace.toString(),
      req.user._id.toString(),
      policies
    );
  }

  getRequest(context: ExecutionContext) {
    let req = this.getRestfulRequest(context);
    if (!req) {
      req = this.getGraphQLRequest(context);
    }
    return req;
  }

  getRestfulRequest(context: ExecutionContext) {
    return context?.switchToHttp?.().getRequest?.();
  }

  getGraphQLRequest(context: ExecutionContext) {
    return GqlExecutionContext?.create?.(context)?.getContext?.()?.req;
  }
}
