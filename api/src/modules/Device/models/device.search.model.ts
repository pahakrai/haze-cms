import {IsString, IsOptional, IsDate, IsBoolean, IsEnum} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import common from '@golpasal/common';

const {DeviceStatus} = common.status;

export class DeviceSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString({each: true})
  users?: string[];

  @IsOptional()
  @IsBoolean()
  userExists?: boolean;

  @IsOptional()
  @IsDate()
  lastOnTimeFr?: Date;

  @IsOptional()
  @IsDate()
  lastOnTimeTo?: Date;

  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  @IsString({each: true})
  deviceTypes?: string[];

  @IsOptional()
  @IsEnum(DeviceStatus)
  deviceStatus?: number;

  @IsOptional()
  online?: boolean;

  @IsOptional()
  @IsString()
  readonly scopes?: string[];
}
