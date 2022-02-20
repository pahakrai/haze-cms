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
import {SubscriptionItemService} from './subscriptionItem.service';

// models
import {
  SubscriptionItemCreateModel,
  SubscriptionItemUpdateModel,
  SubscriptionItemSearchModel
} from './models';

@Controller('subscription-items')
@UseFilters(HttpExceptionFilter)
export class SubscriptionItemController extends BaseController {
  constructor(
    private readonly subscriptionItemService: SubscriptionItemService
  ) {
    super();
  }

  @Post()
  public async create(@Body() body: SubscriptionItemCreateModel) {
    return this.subscriptionItemService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: SubscriptionItemUpdateModel
  ) {
    return this.subscriptionItemService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: SubscriptionItemSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.subscriptionItemService.findWithPaginate(query);
      // do populates
      result.docs = await this.subscriptionItemService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.subscriptionItemService.find(query, {lean: true});
      // do populates
      result = await this.subscriptionItemService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.subscriptionItemService.findById(param._id, {
      lean: true
    });

    return this.subscriptionItemService._populate(
      result,
      query?.populates || []
    );
  }

  /**
   * update subscriptionItem  isActive
   * /Patch/:_id/toggle-isActive?isActive=true
   * @param param id
   * @param param isActive - true or false
   */
  @Patch(':_id/toggle-isActive/:isActive')
  public async toggleIsActive(
    @Param() param: ParamIdModel,
    @Param('isActive') isActive: boolean
  ) {
    return this.subscriptionItemService.toggleIsActive(param._id, isActive);
  }
}
