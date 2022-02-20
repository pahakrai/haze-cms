import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsEmpty,
  IsMongoId,
  IsNumber
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';

export class RegionCreateModel {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEmpty()
  @ApiProperty({description: 'DO NOT PASS THIS FROM FRONTEND'})
  workspace: string;

  @ValidateNested()
  @ApiProperty({required: true})
  name: LocalizeStringModel;

  @IsString({each: true})
  @ApiProperty({required: true})
  subTypes: string[];

  @IsMongoId({each: true})
  @ApiProperty({required: true})
  ancestors: string[];

  @IsMongoId()
  @IsOptional()
  @ApiProperty({required: true})
  parent?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({required: false})
  isActive: boolean;

  @IsOptional()
  filemeta?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({required: false})
  idx: number;

  @IsOptional()
  @IsBoolean()
  isAddress?: boolean;
}
