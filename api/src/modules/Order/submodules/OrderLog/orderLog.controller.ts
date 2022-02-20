import {Get, Body, Query, Post, Controller, UseFilters} from '@nestjs/common';
import {BaseController, HttpExceptionFilter, RequireLogin} from 'src/core';
// services
import {OrderLogService} from './orderLog.service';

// models
import {OrderLogCreateModel, OrderLogSearchModel} from './models';

@RequireLogin()
@Controller('order-logs')
@UseFilters(HttpExceptionFilter)
export class OrderLogController extends BaseController {
  constructor(private readonly orderLogService: OrderLogService) {
    super();
  }

  @Post()
  public async create(@Body() body: OrderLogCreateModel) {
    return this.orderLogService.create(body);
  }

  @Get()
  public async find(@Query() query: OrderLogSearchModel) {
    let result: any;
    const {populates, paginate} = query;
    if (paginate) {
      result = await this.orderLogService.findWithPaginate(query);
      // do populates
      result.docs = await this.orderLogService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.orderLogService.find(query, {lean: true});
      // do populates
      result = await this.orderLogService._populate(result, populates);
    }

    return result;
  }
}
