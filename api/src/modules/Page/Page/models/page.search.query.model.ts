import {IsString, IsOptional, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class PageSearchQueryModel extends BaseSearchModel {
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  isActive?: string;

  @IsOptional()
  isSystem?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  order?: string;

  @IsOptional()
  isTemplate?: string;

  @IsOptional()
  isSection?: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  searchTerm?: string;
}
