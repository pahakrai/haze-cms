import {IsString, IsBoolean, IsOptional, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class PageSearchModel extends BaseSearchModel {
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  path?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({required: false})
  @IsOptional()
  @IsBoolean()
  isSystem?: boolean;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  order?: string;

  @IsOptional()
  @IsBoolean()
  isTemplate?: boolean;

  @IsOptional()
  @IsBoolean()
  isSection?: boolean;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  searchTerm?: string;

  @IsOptional()
  @IsBoolean()
  isSeo?: boolean;
}
