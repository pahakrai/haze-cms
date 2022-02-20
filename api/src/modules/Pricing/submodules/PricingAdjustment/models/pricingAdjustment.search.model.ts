import {IsMongoId, IsOptional, IsEnum} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import common from '@golpasal/common';

export class PricingAdjustmentSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsEnum(common.type.PricingAdjustmentType, {each: true})
  @ApiPropertyOptional({description: 'adjustment type'})
  types?: string[];

  @IsOptional()
  @IsMongoId({each: true})
  @ApiPropertyOptional({description: 'ref document of adjustmetn'})
  refs?: string[];
}
