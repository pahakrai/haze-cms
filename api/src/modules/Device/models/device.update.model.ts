import {IsOptional, IsEnum} from 'class-validator';
import common from '@golpasal/common';

const {DeviceStatus} = common.status;

export class DeviceUpdateModel {
  @IsOptional()
  // for if already exist, becomes update
  readonly id?: string;

  @IsOptional()
  @IsEnum(DeviceStatus)
  readonly deviceStatus?: number;
}
