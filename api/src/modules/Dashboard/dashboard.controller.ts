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

// services
import {DashboardService} from './dashboard.service';
import {WorkspaceInterceptor} from 'src/core/interceptors';

// models
import {
  DashboardCreateModel,
  DashboardUpdateModel,
  DashboardSearchModel
} from './models';
import {RequireLogin} from 'src/core';

@RequireLogin()
@Controller('dashboards')
@UseInterceptors(WorkspaceInterceptor)
@UseFilters(HttpExceptionFilter)
export class DashboardController extends BaseController {
  constructor(private readonly dashboardService: DashboardService) {
    super();
  }

  @Post()
  public async create(@Body() body: DashboardCreateModel) {
    return this.dashboardService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: DashboardUpdateModel
  ) {
    return this.dashboardService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: DashboardSearchModel) {
    return this.dashboardService.find(query);
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel) {
    return this.dashboardService.findById(param._id);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.dashboardService.delete(param._id);
  }
}
