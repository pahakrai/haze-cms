import {IsEnum, IsString, IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

export class OrderLogCreateModel {
  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  workspace?: string;

  @IsEnum(common.type.OrderLogType)
  @ApiProperty({description: 'type of log (release/cancel)'})
  type: string;

  @IsMongoId()
  @ApiProperty({description: 'user (can be driver/admin) who create this log'})
  user: string;

  @IsString()
  @ApiProperty({description: 'reason for cancel/release'})
  reason: string;

  @IsMongoId()
  @ApiProperty({description: 'related order'})
  order: string;
}
