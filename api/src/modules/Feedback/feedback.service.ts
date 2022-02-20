import {Injectable, Scope, Inject, HttpService} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {ObjectId} from 'mongodb';
import common from '@golpasal/common';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  FeedbackCreateModel,
  FeedbackUpdateModel,
  FeedbackSearchModel
} from './models';
import {BadRequestException, getEEOAuthHeader} from 'src/core';

import {FeedbackModel, Feedback} from './interfaces';
import {IUser} from '../User';
import {MemberService} from '../Member/member.service';
import {WorkspaceService} from '../Workspace/workspace.service';

const {UserType, IntegrationAppType} = common.type;

@Injectable({scope: Scope.REQUEST})
export class FeedbackService extends BaseCRUDService<
  Feedback,
  FeedbackCreateModel,
  FeedbackUpdateModel,
  FeedbackSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Feedbacks')
    private readonly feedbackRepository: FeedbackModel,
    private readonly memberService: MemberService,
    private readonly httpService: HttpService,
    private readonly workspaceService: WorkspaceService
  ) {
    super(feedbackRepository, request);
  }

  public _castQuery(searchModel: FeedbackSearchModel) {
    const queryAnd: any = [];
    const {from, to, refType, ref} = searchModel;

    const user = this.getCurrentUser<IUser>();

    let workspace: string;
    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    queryAnd.push({workspace: workspace});

    // from
    if (from) {
      queryAnd.push({from});
    }

    if (to) {
      queryAnd.push({to});
    }
    if (refType) {
      queryAnd.push({refType});
    }

    if (ref) {
      queryAnd.push({ref});
    }

    return queryAnd.length ? {$and: queryAnd} : {};
  }

  async createFeedback(feedbackCreateModel: FeedbackCreateModel) {
    const user = this.getCurrentUser<IUser>();

    // check from, to not the same value (i.e. cannot leave feedback to myself)
    if (user._id.toHexString() === feedbackCreateModel.to) {
      throw new BadRequestException({
        code: 'err_not_allow_leave_feedback_myself'
      });
    }

    // check not left feedback before
    if (
      await this.isLeftFeedbackYet(
        feedbackCreateModel.to,
        feedbackCreateModel.refType,
        feedbackCreateModel.ref
      )
    ) {
      throw new BadRequestException({code: 'err_left_feedback_already'});
    }

    // update member/merchant avgFeedback
    const userFeedbackCount = await this.countDocuments({
      to: feedbackCreateModel.to
    });
    if (user.userTypes.includes(UserType.USER)) {
      // update member.avgRating
      const member = await this.memberService.findOne({
        user: feedbackCreateModel.to
      });

      // calculate new avgFeedback
      const newAvgFeedback =
        (member.avgFeedback * userFeedbackCount + feedbackCreateModel.rating) /
        (userFeedbackCount + 1);

      // update member
      await this.memberService.update(member._id, {
        avgFeedback: newAvgFeedback
      });
    }

    return super.create({
      ...feedbackCreateModel,
      from: user._id.toHexString(),
      workspace: user.currentWorkspace.toHexString()
    });
  }

  /**
   * determine left feedback yet from an item
   * @param to
   * @param refType eg: Orders, Members, Merchants, etc.
   * @param ref id of the given refType
   */
  public async isLeftFeedbackYet(to: string, refType: string, ref: string) {
    const user = this.getCurrentUser<IUser>();

    const query = this._castQuery({
      from: user._id.toHexString(),
      to: to,
      refType: refType,
      ref: ref
    });
    const feedbackCount = await this.feedbackRepository
      .countDocuments(query)
      .exec();

    return !(feedbackCount === 0);
  }

  /**
   * get average rating of a feedback of certain refId
   * @param to to user
   * @param refType eg: Orders, Members, Merchants, Recruitment etc.
   */
  public async getOverallRating(to: string, refType: string): Promise<number> {
    const result = await this.feedbackRepository
      .aggregate()
      .match({to: new ObjectId(to), refType})
      .group({
        _id: null,
        rating: {$avg: '$rating'}
      })
      .exec();

    return result.length > 0 ? result[0]?.rating : 0;
  }

  public async getSubscriptionLogs(query: any) {
    const currentUser = this.getCurrentUser();
    const currentWorkspace =
      currentUser?.currentWorkspace || this.getHeaderWorkspace();
    const workspace = await this.workspaceService.findById(currentWorkspace);

    const integration = workspace.integrations.find(
      i => i.app === IntegrationAppType.EEOCN
    );
    const hook = integration?.hooks?.find(
      h => h.code === 'GET_SUBSCRIPTION_LOGS'
    );

    if (hook) {
      const hookHeaders =
        hook.headers?.reduce<any>(
          (obj, {key, value}) => ({...obj, [key]: value}),
          {}
        ) || {};

      try {
        const result = await this.httpService
          .get(`${hook.url}`, {
            headers: {
              ...getEEOAuthHeader(workspace.secret),
              ...hookHeaders,
              workspace: workspace._id.toHexString()
            },
            params: {...query}
          })
          .toPromise();
        return result?.data;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }
  }
}
