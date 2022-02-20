import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector, ModuleRef, ContextIdFactory} from '@nestjs/core';
import {GqlExecutionContext} from '@nestjs/graphql';
import {Request} from 'express';

import {getMD5Hash} from '../utils';
import {WorkspaceService} from 'src/modules/Workspace/workspace.service';
import {
  BYPASS_SECRET_METADATA_KEY,
  PROGRAMMATIC_API_METADATA_KEY
} from '../decorators';
import {JwtAuthGuard} from './jwt.auth.guard';

@Injectable()
export class AppAuthGuard extends JwtAuthGuard implements CanActivate {
  constructor(protected reflector: Reflector, protected moduleRef: ModuleRef) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext) {
    const bypassSecretGuard = this.reflector.getAllAndOverride<boolean>(
      BYPASS_SECRET_METADATA_KEY,
      [context.getHandler(), context.getClass()]
    );
    const isProgrammaticAPI = this.reflector.getAllAndOverride<boolean>(
      PROGRAMMATIC_API_METADATA_KEY,
      [context.getHandler(), context.getClass()]
    );

    // exclude public api (with @PublicAPI() decorator)
    if (!(bypassSecretGuard || isProgrammaticAPI)) {
      // get Request object
      let request: Request = context.switchToHttp().getRequest();
      if (!request) {
        const ctx = GqlExecutionContext.create(context);
        const grahpQlCtx = ctx.getContext();

        request = grahpQlCtx.req;
      }

      // get WorkspaceService
      const contextId = ContextIdFactory.getByRequest(request);
      const workspaceService: WorkspaceService = await this.moduleRef.resolve(
        WorkspaceService,
        contextId,
        {strict: false}
      );

      // het safe-key from header/query
      let safeKey: string;
      let workspaceId: string;
      let timestamp: number;

      if (request.header('safe-key')) {
        safeKey = request.header('safe-key');
        workspaceId = request.header('workspace');
        timestamp = parseInt(request.header('timestamp'), 10);
      } else if (request.query['safe-key']) {
        safeKey = request.query['safe-key'] as string;
        workspaceId = request.query['workspace'] as string;
        timestamp = parseInt(request.query['timestamp'] as string, 10);
      }

      if (!(safeKey && workspaceId && timestamp)) {
        return false;
      }

      // verify timestamp, should within 5 minute
      if (Math.abs(Date.now() - timestamp) > 300000) {
        return false;
      }

      // get workspace and match secret
      const workspace = await workspaceService.findById(workspaceId, {
        lean: true
      });

      if (!workspace) {
        return false;
      }
      const hashedSecret = getMD5Hash(`${workspace.secret}${timestamp}`);

      if (hashedSecret !== safeKey) {
        return false;
      }
    }

    // perform auth guard
    return super.canActivate(context) as Promise<boolean>;
  }
}
