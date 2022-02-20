'use strict';
import {
  IsArray,
  IsString,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsOptional
} from 'class-validator';
import {classToPlain} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class FileMetaCreateModel {
  @IsString()
  _id?: string;

  @ApiProperty({required: true, description: 'folder'})
  @IsString()
  folder: string;

  @ApiProperty({
    required: true,
    description: 'Service Type, AWS, Google, etc...'
  })
  @IsNotEmpty({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {model: 'key_service_type'}
        })
      ); // service type
    }
  })
  serviceType: string;

  @ApiProperty({required: true, description: 'Tags'})
  @IsArray()
  tags: Array<any>;

  @ApiProperty({required: true, description: 'uri of file'})
  @IsString()
  uri: string;

  @ApiProperty({required: false})
  @IsString()
  thumbnailUri: string;

  @ApiProperty({required: true, description: 'original name of file'})
  @IsString()
  originalName: string;

  @ApiProperty({required: true, description: 'file extension of file'})
  @IsString()
  fileExtension: string;

  @ApiProperty({required: true, description: 'display name of file'})
  @IsString()
  displayName: string;

  @ApiProperty({required: true, description: 'uploaded name of file'})
  @IsString()
  uploadedName: string;

  @ApiProperty({required: true, description: 'mimetype of file'})
  @IsString()
  mimetype: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  size: number;

  @ApiProperty({required: false, description: 'Is System file'})
  @IsBoolean()
  @IsOptional()
  isSystemFile: boolean;

  @ApiProperty({description: 'workspace'})
  @IsOptional()
  workspace: string;
}
