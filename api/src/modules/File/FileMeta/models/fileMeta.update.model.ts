'use strict';
import {
  IsArray,
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class FileMetaUpdateModel {
  @ApiProperty()
  @IsString()
  @IsOptional()
  folder: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  serviceType: string;

  @ApiProperty({required: false})
  @IsArray()
  @IsOptional()
  tags: Array<any>;

  @ApiProperty()
  @IsString()
  @IsOptional()
  uri: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  thumbnailUri: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  originalName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fileExtension: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  displayName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  uploadedName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  size: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isSystemFile: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mimetype: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  workspace: string;
}
