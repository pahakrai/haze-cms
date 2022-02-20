import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {
  GraphQLExceptionFilter,
  RatingHelper,
  BadRequestException,
  RequireLogin
} from 'src/core';
import {WorkspaceService} from '../Workspace/workspace.service';

import {FeedbackService} from './feedback.service';

@Resolver('Feedback')
@UseFilters(GraphQLExceptionFilter)
export class FeedbackResolver {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly workspaceService: WorkspaceService
  ) {}

  @ResolveField('to')
  async getTo(@Parent() feedback) {
    if (!feedback.to) return null;

    const {to} = await this.feedbackService._populate(feedback, ['client']);

    return to;
  }

  @ResolveField('from')
  async getFrom(@Parent() feedback) {
    if (!feedback.from) return null;

    const {from} = await this.feedbackService._populate(feedback, ['client']);

    return from;
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() feedback) {
    if (!feedback.workspace) return null;

    const {workspace} = await this.feedbackService._populate(feedback, [
      'order'
    ]);

    return workspace;
  }

  @ResolveField('order')
  async getOrder(@Parent() feedback) {
    if (feedback.refType !== 'Orders') return null;

    const {ref} = await this.feedbackService._populate(feedback, ['ref']);

    return ref;
  }

  @ResolveField('product')
  async getProduct(@Parent() feedback) {
    if (feedback.refType !== 'Products') return null;

    const {ref} = await this.feedbackService._populate(feedback, ['ref']);

    return ref;
  }

  @ResolveField('rating')
  async parseRating(@Parent() feedback) {
    // transform db value (0-100) to front-end value (0-5)
    const workspace = await this.workspaceService.findById(feedback.workspace);

    return RatingHelper.castRatingToDisplay(
      feedback.rating,
      workspace.setting.ratingMaxValue
    );
  }

  @Query()
  async feedback(@Args('id') id: string, @Args('query') query) {
    if (!(id || query)) {
      throw new BadRequestException({code: 'err_missing_param'});
    }

    if (query) {
      return this.feedbackService.findOne(query);
    }
    return this.feedbackService.findById(id);
  }

  @Query()
  async feedbacks(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.feedbackService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Query()
  @RequireLogin()
  async isLeftFeedbackYet(
    @Args('to') to,
    @Args('refType') refType,
    @Args('ref') ref
  ) {
    return this.feedbackService.isLeftFeedbackYet(to, refType, ref);
  }

  @Mutation()
  @RequireLogin()
  async createFeedback(@Args('feedbackCreateModel') feedbackCreateModel) {
    // transform front-end value (0-5) to db value (0-100)
    feedbackCreateModel.rating = RatingHelper.castRatingToDbValue(
      feedbackCreateModel.rating,
      5
    );

    return this.feedbackService.createFeedback(feedbackCreateModel);
  }

  @Mutation()
  @RequireLogin()
  async updateFeedback(
    @Args('id') id: string,
    @Args('feedbackUpdateModel') feedbackUpdateModel
  ) {
    // transform front-end value (0-5) to db value (0-100)
    feedbackUpdateModel.rating = RatingHelper.castRatingToDbValue(
      feedbackUpdateModel.rating,
      5
    );

    return this.feedbackService.update(id, feedbackUpdateModel, {lean: true});
  }
}
