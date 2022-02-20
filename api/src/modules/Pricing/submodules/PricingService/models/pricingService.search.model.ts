import {IsOptional, IsMongoId} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class PricingServiceSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsMongoId({each: true})
  @ApiPropertyOptional({description: 'service id array'})
  services?: string[];
}
