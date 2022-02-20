import {ExecutionContext, ForbiddenException, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthGuard} from '@nestjs/passport';
import {GqlExecutionContext} from '@nestjs/graphql';

import {
  ALLOW_ACTION_METADATA_KEY,
  REQUIRE_LOGIN_METADATA_KEY,
  USER_STATUS_METADATA_KEY,
  USER_TYPE_METADATA_KEY
} from '../decorators';
import {UnauthorizedException} from '../exceptions';
import {isAclActionAllow} from 'src/modules/Ac/utils';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(protected reflector: Reflector) {
    super();
  }

  /**
   * get request from http/graphql context
   * @param context execution context
   */
  getRequest(context: ExecutionContext) {
    switch (context.getType<'http' | 'graphql'>()) {
      case 'http':
        return context.switchToHttp().getRequest();
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
  }

  handleRequest(err: any, user: any, info: any, context: any) {
    // extract decorators
    const requireLogin = this.reflector.getAllAndOverride<boolean>(
      REQUIRE_LOGIN_METADATA_KEY,
      [context.getHandler(), context.getClass()]
    );
    const allowActions = this.reflector.getAllAndOverride<string[]>(
      ALLOW_ACTION_METADATA_KEY,
      [context.getHandler(), context.getClass()]
    );
    const allowUserTypes = this.reflector.getAllAndOverride<string[]>(
      USER_TYPE_METADATA_KEY,
      [context.getHandler(), context.getClass()]
    );
    const allowUserStatuses = this.reflector.getAllAndOverride<number[]>(
      USER_STATUS_METADATA_KEY,
      [context.getHandler(), context.getClass()]
    );

    // error already occured when authenticate
    if (err) {
      throw err;
    }

    // login required but user not found
    if (
      (requireLogin || allowActions || allowUserTypes || allowUserStatuses) &&
      !user
    ) {
      throw new UnauthorizedException({code: 'err_unauthorized'});
    }

    // require specific actions
    if (
      allowActions?.length > 0 &&
      !isAclActionAllow(allowActions, user.actions)
    ) {
      throw new ForbiddenException({});
    }

    // require specific user types
    if (
      allowUserTypes?.length > 0 &&
      !allowUserTypes.some(ut => user.userTypes.includes(ut))
    ) {
      throw new ForbiddenException({});
    }

    // require specific user statuses
    if (
      allowUserStatuses?.length > 0 &&
      !allowUserStatuses.includes(user.status)
    ) {
      throw new ForbiddenException({});
    }

    return user;
  }
}
