import {
  IsOptional,
  ValidateNested,
  IsEnum,
  IsString,
  IsMongoId
} from 'class-validator';
import {LocalizeStringModel} from 'src/core';
import common from '@golpasal/common';
const {ProductTypeStatus} = common.status;

export class ProductTypeUpdateModel {
  @ValidateNested()
  @IsOptional()
  name?: LocalizeStringModel;

  @ValidateNested()
  @IsOptional()
  description?: LocalizeStringModel;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsMongoId({each: true})
  images?: string[];

  @IsOptional()
  @IsEnum(ProductTypeStatus)
  status?: number;
}
