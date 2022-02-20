import {
  IsString,
  IsBoolean,
  // IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsArray
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel, LocalizeStringModel} from 'src/core';

export class SystemReportSearchModel extends BaseSearchModel {
  @ApiPropertyOptional()
  @IsOptional()
  name?: LocalizeStringModel;

  @ApiPropertyOptional()
  @ValidateNested()
  @IsOptional()
  filePath?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  parameters?: Array<{
    code?: string;
    name?: LocalizeStringModel;
    dataType?: string;
    isDbNull?: boolean;
    isNull?: boolean;
    size?: number;
    value?: string;
  }>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  commandText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  format?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
