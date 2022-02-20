import {
  IsString,
  IsMongoId,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  IsEnum
} from 'class-validator';
import common from '@golpasal/common';

const {DeviceStatus} = common.status;

export class DeviceCreateModel {
  @IsOptional()
  // for if already exist, becomes update
  readonly _id?: string;

  @IsMongoId()
  @IsNotEmpty()
  workspace: string;

  @IsOptional()
  @IsMongoId()
  readonly user?: string;

  @IsOptional()
  @IsString()
  readonly pushNotificationToken?: string;

  @IsOptional()
  @IsString()
  readonly deviceType?: string;

  @IsOptional()
  @IsString()
  readonly deviceName?: string;

  @IsOptional()
  readonly lastOnTime?: Date;

  @IsOptional()
  @IsBoolean()
  readonly online?: boolean;

  @IsOptional()
  @IsString()
  readonly state?: string;

  @IsOptional()
  @IsString()
  readonly locale?: string;

  @IsOptional()
  @IsString()
  readonly scope?: string;

  @IsOptional()
  @IsEnum(DeviceStatus)
  readonly deviceStatus?: number;
}
