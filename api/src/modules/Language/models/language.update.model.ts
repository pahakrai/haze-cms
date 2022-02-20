import {IsEnum, ValidateNested, IsOptional, IsBoolean} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';
import common from '@golpasal/common';
const {LanguageType} = common.type;
export class LanguageUpdateModel {
  @ApiPropertyOptional({description: 'name'})
  @IsOptional()
  @ValidateNested()
  name: LocalizeStringModel;

  @ApiPropertyOptional({description: 'types'})
  @IsEnum(LanguageType, {each: true})
  @IsOptional()
  types?: string[];

  @ApiPropertyOptional({description: 'isActive'})
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
