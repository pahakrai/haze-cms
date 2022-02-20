import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {
  DeviceLocationLogCreateModel,
  DeviceLocationLogSearchModel
} from './models';
import {DeviceLocationLogModel, DeviceLocationLog} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class DeviceLocationLogService extends BaseCRUDService<
  DeviceLocationLog,
  DeviceLocationLogCreateModel,
  {},
  DeviceLocationLogSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('DeviceLocationLogs')
    private readonly deviceLocationLogRepository: DeviceLocationLogModel
  ) {
    super(deviceLocationLogRepository, request);
  }
}
