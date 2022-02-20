import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Patch,
  Controller,
  UseFilters
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {SubscriptionPlanService} from './subscriptionPlan.service';

// models
import {
  SubscriptionPlanCreateModel,
  SubscriptionPlanUpdateModel,
  SubscriptionPlanSearchModel
} from './models';

@Controller('subscription-plans')
@UseFilters(HttpExceptionFilter)
export class SubscriptionPlanController extends BaseController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService
  ) {
    super();
  }

  @Post()
  public async create(@Body() body: SubscriptionPlanCreateModel) {
    return this.subscriptionPlanService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: SubscriptionPlanUpdateModel
  ) {
    return this.subscriptionPlanService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: SubscriptionPlanSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.subscriptionPlanService.findWithPaginate(query);
      // do populates
      result.docs = await this.subscriptionPlanService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.subscriptionPlanService.find(query, {lean: true});
      // do populates
      result = await this.subscriptionPlanService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.subscriptionPlanService.findById(param._id, {
      lean: true
    });

    return this.subscriptionPlanService._populate(
      result,
      query?.populates || []
    );
  }

  /**
   * update subscriptionPlan  isActive
   * /Patch/:_id/toggle-isActive?isActive=true
   * @param param id
   * @param param isActive - true or false
   */
  @Patch(':_id/toggle-isActive/:isActive')
  public async toggleIsActive(
    @Param() param: ParamIdModel,
    @Param('isActive') isActive: boolean
  ) {
    return this.subscriptionPlanService.toggleIsActive(param._id, isActive);
  }
}
