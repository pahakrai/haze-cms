import {IsString, IsOptional, IsNumber, IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class PostSearchModel extends BaseSearchModel {
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  postDate?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  snippets?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  priority?: number;

  @ApiProperty({required: false})
  @IsOptional()
  isActive?: boolean;

  @IsMongoId()
  @IsOptional()
  createdBy?: string;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString({each: true})
  @IsOptional()
  excludeIds?: Array<string>;

  @IsString({each: true})
  @IsOptional()
  likes?: Array<string>;

  @IsOptional()
  @IsString({each: true})
  platformTypes?: Array<string>;
}
