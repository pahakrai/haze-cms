import {IsString, IsNotEmpty, IsEnum, IsEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

const {TagRecommendationType} = common.type;

export class TagRecommendationCreateModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'tag content'})
  text: string;

  @IsEnum(TagRecommendationType)
  @ApiProperty({description: 'recommendation type'})
  type: string;

  @IsEmpty()
  @ApiProperty({description: 'DO NOT PASS THIS FROM FRONTEND'})
  workspace: string;
}
