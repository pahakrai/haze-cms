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
import {RequireLogin} from 'src/core';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {SalesVolumeService} from './salesVolume.service';

// models
import {
  SalesVolumeSearchModel,
  SalesVolumeFormUpdateModel,
  SalesVolumeFormCreateModel
} from './models';

@RequireLogin()
@Controller('sales-volumes')
@UseFilters(HttpExceptionFilter)
export class SalesVolumeController extends BaseController {
  constructor(private readonly salesVolumeService: SalesVolumeService) {
    super();
  }

  @Post()
  public async create(@Body() body: SalesVolumeFormCreateModel) {
    return this.salesVolumeService.createSalesVolume(body);
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: SalesVolumeFormUpdateModel
  ) {
    return this.salesVolumeService.updateSalesVolume(param._id, body);
  }

  @Get()
  public async find(@Query() query: SalesVolumeSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.salesVolumeService.findWithPaginate(query);
      // do populates
      result.docs = await this.salesVolumeService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.salesVolumeService.find(query, {lean: true});
      // do populates
      result = await this.salesVolumeService._populate(result, populates);
    }

    return result;
  }

  @Get('year-overview')
  public async findYearOverview(
    @Query('currency') currency: string,
    @Query('year') year: number
  ) {
    return this.salesVolumeService.findYearOverview(currency, year);
  }

  @Get('month-overview')
  public async findMonthOverview(
    @Query('currency') currency = 'HKD',
    @Query('year') year: number,
    @Query('month') month: number
  ) {
    return this.salesVolumeService.findMonthOverview(currency, year, month);
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.salesVolumeService.findById(param._id, {
      lean: true
    });

    return this.salesVolumeService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.salesVolumeService.delete(param._id);
  }
}
