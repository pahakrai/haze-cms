import {IsString, IsOptional, IsMongoId} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class ParamUpdateModel {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @ApiPropertyOptional()
  parameters?: any;

  @IsOptional()
  @IsMongoId()
  workspace?: string;
}
