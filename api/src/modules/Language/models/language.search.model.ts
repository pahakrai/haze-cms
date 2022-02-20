import {
  IsString,
  IsOptional,
  IsEnum,
  IsMongoId,
  IsBoolean
} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import {ApiPropertyOptional} from '@nestjs/swagger';
import common from '@golpasal/common';
const {LanguageType} = common.type;
export class LanguageSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  workspace?: string;

  @ApiPropertyOptional({description: 'name'})
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({description: 'types'})
  @IsEnum(LanguageType, {each: true})
  @IsOptional()
  types?: string[];

  @ApiPropertyOptional({description: 'isActive'})
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
