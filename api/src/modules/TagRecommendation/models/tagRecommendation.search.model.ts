import {IsString, IsOptional, IsArray} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class TagRecommendationSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'recommendation type'})
  type?: string;

  @IsOptional()
  @IsArray()
  @IsString({each: true})
  texts?: string[];
}
