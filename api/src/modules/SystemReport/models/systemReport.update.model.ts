import {
  IsString,
  IsOptional,
  ValidateNested,
  IsMongoId,
  IsArray
} from 'class-validator';
import {LocalizeStringModel} from 'src/core';

export class SystemReportUpdateModel {
  @IsOptional()
  name?: LocalizeStringModel;

  @ValidateNested()
  @IsOptional()
  filePath?: any;

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

  @IsOptional()
  @IsString()
  commandText?: string;

  @IsOptional()
  @IsString()
  format?: string;

  @IsMongoId({each: true})
  @IsOptional()
  workspaces?: Array<string>;

  // workspace types
  @IsOptional()
  @IsString({each: true})
  workspaceTypes?: Array<string>;
}
