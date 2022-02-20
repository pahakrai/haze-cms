import {
  Get,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  UseFilters
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {DeviceLocationLogService} from './deviceLocationLog.service';

// models
import {
  DeviceLocationLogCreateModel,
  DeviceLocationLogSearchModel
} from './models';

@RequireLogin()
@Controller('device-location-logs')
@UseFilters(HttpExceptionFilter)
export class DeviceLocationLogController extends BaseController {
  constructor(
    private readonly deviceLocationLogService: DeviceLocationLogService
  ) {
    super();
  }

  @Post()
  public async create(@Body() body: DeviceLocationLogCreateModel) {
    return this.deviceLocationLogService.create(body);
  }

  @Get()
  public async find(@Query() query: DeviceLocationLogSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (String(paginate) === 'true') {
      result = await this.deviceLocationLogService.findWithPaginate(query);
      // do populates
      result.docs = await this.deviceLocationLogService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.deviceLocationLogService.find(query);
      // do populates
      result = await this.deviceLocationLogService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.deviceLocationLogService.findById(param._id);

    return this.deviceLocationLogService._populate(
      result,
      query ? query.populates : []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.deviceLocationLogService.delete(param._id);
  }
}
