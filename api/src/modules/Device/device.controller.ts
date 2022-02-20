import {
  Get,
  Put,
  Body,
  Param,
  Patch,
  Query,
  Controller,
  UseFilters
} from '@nestjs/common';

import {DeviceService} from './device.service';
import {
  DeviceCreateModel,
  UpdateDeviceLocationModel,
  DeviceUpdateModel
} from './models';

// core
import {BaseController} from 'src/core/layers';
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';
import {DeviceSearchModel} from './models/device.search.model';

@Controller('devices')
@UseFilters(HttpExceptionFilter)
export class DeviceController extends BaseController {
  constructor(private readonly deviceService: DeviceService) {
    super();
  }

  @Put()
  async registerDevice(@Body() registerDeviceDodel: DeviceCreateModel) {
    const device = await this.deviceService.registerDevice(registerDeviceDodel);
    return device;
  }

  @Patch(':_id/location')
  async updateDeviceLocation(
    @Param('_id') _id,
    @Query() updateDeviceLocationModel: UpdateDeviceLocationModel
  ) {
    const coordinates = updateDeviceLocationModel.latlng
      .split(',')
      .reverse()
      .map(o => parseFloat(o));
    const device = await this.deviceService.updateDeviceLocation(
      _id,
      coordinates
    );
    return device;
  }

  /**
   * find device  by query string
   * @param query req.query
   */
  @RequireLogin()
  @Get()
  public async find(@Query() query: DeviceSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.deviceService.findWithPaginate(query);
      // do populates
      result.docs = await this.deviceService._populate(result.docs, populates);
    } else {
      result = await this.deviceService.find(query, {lean: true});
      // do populates
      result = await this.deviceService._populate(result, populates);
    }

    return result;
  }

  @Put(':_id')
  @RequireLogin()
  public async updateDeviceStatus(
    @Param() param,
    @Body() body: DeviceUpdateModel
  ) {
    const result = await this.deviceService.updateDeviceStatus(
      param._id,
      body.deviceStatus
    );
    return result;
  }

  @Get('isBlackListDevice/:_id')
  @RequireLogin()
  public async isBlackListDevice(@Param() param) {
    return this.deviceService.isBlackListDevice(param);
  }
}
