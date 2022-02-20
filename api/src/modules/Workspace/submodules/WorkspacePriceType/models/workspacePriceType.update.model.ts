import {IsMongoId, IsOptional, IsEnum} from 'class-validator';
import common from '@golpasal/common';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class WorkspacePriceTypeUpdateModel {
  @IsMongoId()
  @IsOptional()
  workspace?: string;

  @IsOptional()
  @IsEnum(common.type.PriceType)
  @ApiPropertyOptional({description: 'price type'})
  priceType?: string;
}
