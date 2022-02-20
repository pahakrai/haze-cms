import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import {map} from 'rxjs/operators';
import {GqlExecutionContext} from '@nestjs/graphql';

import {WorkspaceService} from '../../modules/Workspace/workspace.service';

@Injectable()
export class WorkspaceInterceptor implements NestInterceptor {
  constructor(private readonly workspaceService: WorkspaceService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    let request;

    // check whether coming request is REST/GraphQL
    // For GraphQL request, context.args[0] is undefined
    // for REST request, context.args[0] is the request object
    if (context.getArgByIndex(0)) {
      // REST request
      request = context.switchToHttp().getRequest();
    } else {
      // gql request
      request = GqlExecutionContext.create(context).getContext().req;
    }

    // check for user exists
    if (request.user?.currentWorkspace) {
      // fetch current workspace by id
      const workspace = await this.workspaceService.findById(
        request.user.currentWorkspace,
        {lean: true}
      );

      // add to request object
      request.workspace = workspace;
    }

    return next.handle().pipe(map(data => data));
  }
}
