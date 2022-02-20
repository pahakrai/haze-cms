import {
  IsString,
  ValidateNested,
  IsArray,
  IsMongoId,
  IsOptional,
  IsBoolean
} from 'class-validator';
import {LocalizeStringModel} from 'src/core';

export class SystemReportCreateModel {
  name: LocalizeStringModel;

  @ValidateNested()
  filePath: any;

  @IsArray()
  parameters: Array<{
    code: string;
    name: LocalizeStringModel;
    dataType: string;
    isDbNull: boolean;
    isNull: boolean;
    size: number;
    value: string;
  }>;

  @IsString()
  commandText: string;

  @IsString()
  format: string;

  @IsMongoId({each: true})
  @IsOptional()
  workspaces?: Array<string>;

  // workspace types
  @IsOptional()
  @IsString({each: true})
  workspaceTypes: Array<string>;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
