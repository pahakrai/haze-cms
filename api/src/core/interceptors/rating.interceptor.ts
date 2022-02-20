import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext
} from '@nestjs/common';
import {Request} from 'express';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IUser} from 'src/modules/User';
import {WorkspaceService} from 'src/modules/Workspace/workspace.service';

import {RatingHelper} from '../utils';

@Injectable()
export class RatingInterceptor implements NestInterceptor {
  constructor(private readonly workspaceService: WorkspaceService) {}

  // cast rating to display value
  mapData(data: any, ratingMaxValue: number) {
    data = data.toObject ? data.toObject() : data;

    if (typeof data.rating === 'number') {
      const rating = RatingHelper.castRatingToDisplay(
        data.rating,
        ratingMaxValue
      );

      return {...data, rating};
    }
    return data;
  }

  public async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const workspace = await this.workspaceService.findById(
      (request.user as IUser).currentWorkspace?.toHexString() ||
        request.header('workspace')
    );

    if (typeof request?.body?.rating === 'number') {
      // parse rating in body
      request.body.rating = RatingHelper.castRatingToDbValue(
        request.body.rating,
        workspace.setting.ratingMaxValue
      );
    }

    // handle response
    return next.handle().pipe(
      map(data => {
        let result = data;

        if (Array.isArray(result)) {
          // array
          result = result.map(d =>
            this.mapData(d, workspace.setting.ratingMaxValue)
          );
        } else if (Array.isArray(result.docs) && result.docs.length > 0) {
          // paginate result
          result.docs = result.docs.map(d =>
            this.mapData(d, workspace.setting.ratingMaxValue)
          );
        } else {
          // single data response
          result = this.mapData(result, workspace.setting.ratingMaxValue);
        }

        return result;
      })
    );
  }
}
