import {
  // IsString,
  IsMongoId,
  ValidateNested,
  IsOptional,
  IsBoolean,
  IsEnum
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';
import common from '@golpasal/common';
const {LanguageType} = common.type;

export class LanguageCreateModel {
  @IsMongoId()
  workspace: string;

  @ValidateNested()
  @ApiProperty({description: 'name'})
  name: LocalizeStringModel;

  @ApiProperty({required: false})
  @IsEnum(LanguageType, {each: true})
  @IsOptional()
  types?: string[];

  @IsBoolean()
  isActive: boolean;
}
