import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';
import {RatingInterceptor} from 'src/core/interceptors';

// services
import {FeedbackService} from './feedback.service';

// models
import {
  FeedbackCreateModel,
  FeedbackUpdateModel,
  FeedbackSearchModel
} from './models';
import {RequireLogin} from 'src/core';

@RequireLogin()
@Controller('feedbacks')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(RatingInterceptor)
export class FeedbackController extends BaseController {
  constructor(private readonly feedbackService: FeedbackService) {
    super();
  }

  @Post()
  public async create(@Body() body: FeedbackCreateModel) {
    return this.feedbackService.create(body, {lean: true});
  }

  @Post('/insertMany')
  public async insertMany(@Body() body: FeedbackCreateModel[]) {
    return this.feedbackService.insertMany(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: FeedbackUpdateModel
  ) {
    return this.feedbackService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: FeedbackSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.feedbackService.findWithPaginate(query);
      // do populates
      result.docs = await this.feedbackService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.feedbackService.find(query, {lean: true});
      // do populates
      result = await this.feedbackService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.feedbackService.findById(param._id, {lean: true});

    return this.feedbackService._populate(result, query ? query.populates : []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.feedbackService.delete(param._id);
  }

  @Get('find/subscription-logs')
  public async findSubscriptionLogs(@Query() query?) {
    return this.feedbackService.getSubscriptionLogs(query);
  }
}
