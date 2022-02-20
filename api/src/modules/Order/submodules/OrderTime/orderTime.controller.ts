import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  UseFilters
} from '@nestjs/common';
import {ParamIdModel, BaseController, HttpExceptionFilter} from 'src/core';

// services
import {OrderTimeService} from './orderTime.service';

// models
import {
  OrderTimeCreateModel,
  OrderTimeUpdateModel,
  OrderTimeSearchModel
} from './models';

@Controller('order-times')
@UseFilters(HttpExceptionFilter)
export class OrderTimeController extends BaseController {
  constructor(private readonly orderTimeService: OrderTimeService) {
    super();
  }

  @Post()
  public async create(@Body() body: OrderTimeCreateModel) {
    return this.orderTimeService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: OrderTimeUpdateModel
  ) {
    return this.orderTimeService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: OrderTimeSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.orderTimeService.findWithPaginate(query);
      // do populates
      result.docs = await this.orderTimeService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.orderTimeService.find(query, {lean: true});
      // do populates
      result = await this.orderTimeService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.orderTimeService.findById(param._id, {
      lean: true
    });

    return this.orderTimeService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.orderTimeService.delete(param._id);
  }
}
