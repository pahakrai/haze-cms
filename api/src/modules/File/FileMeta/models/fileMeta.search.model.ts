'use strict';
import {IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models';

export class FileMetaSearchModel extends BaseSearchModel {
  @ApiProperty({required: false})
  @IsOptional()
  serviceType?: string;

  @ApiProperty({required: false})
  @IsOptional()
  tags?: string;

  @ApiProperty({required: false})
  @IsOptional()
  folder?: string;

  @ApiProperty({required: false})
  @IsOptional()
  fileExtension?: string;

  @ApiProperty({required: false})
  @IsOptional()
  isSystemFile?: boolean;

  @ApiProperty({required: false})
  @IsOptional()
  _ids?: Array<string>;

  @ApiProperty({required: false})
  @IsOptional()
  originalName?: string;

  @ApiProperty({required: false})
  @IsOptional()
  displayName?: string;

  @ApiProperty({required: false})
  @IsOptional()
  thumbnailUri?: string;

  @ApiProperty({required: false})
  @IsOptional()
  uploadedName?: string;

  @ApiProperty({required: false})
  @IsOptional()
  sort?: string;
}
