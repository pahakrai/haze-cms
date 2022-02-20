import {
  IsString,
  IsOptional,
  IsEnum,
  IsMongoId,
  ValidateNested
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';
import common from '@golpasal/common';
const {ProductTypeStatus} = common.status;

export class ProductTypeCreateModel {
  @ValidateNested()
  @ApiProperty({
    description: 'name of product type'
  })
  name: LocalizeStringModel;

  @ValidateNested()
  @ApiProperty({
    description: 'description of product type'
  })
  description: LocalizeStringModel;

  @IsMongoId()
  workspace: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsMongoId({each: true})
  images?: string[];

  @IsEnum(ProductTypeStatus)
  status: number;
}
