import {IsEnum, IsOptional, IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class OrderLogSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsEnum(common.type.OrderLogType, {each: true})
  @ApiProperty({description: 'type of log (release/cancel)'})
  types?: string[];

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'user (can be driver/admin) who create this log'})
  user?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'related order'})
  order?: string;
}
