import {IsString, IsOptional, IsNumber, IsBoolean} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class BaseSearchModel {
  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  _id?: string;

  @ApiProperty({required: false})
  @IsString({each: true})
  @IsOptional()
  _ids?: Array<string>;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  workspace?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  createdAtFr?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  createdAtTo?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  offset?: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsBoolean()
  paginate?: boolean;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  currentLanguage?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString({each: true})
  populates?: Array<string>;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  sort?: string;
}
