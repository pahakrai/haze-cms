import {IsString, IsEnum, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import common from '@golpasal/common';

const {TagRecommendationType} = common.type;

export class TagRecommendationUpdateModel {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'tag content'})
  text: string;

  @IsOptional()
  @IsEnum(TagRecommendationType)
  @ApiPropertyOptional({description: 'recommendation type'})
  type: string;
}
