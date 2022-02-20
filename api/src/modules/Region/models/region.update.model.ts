import {
  IsString,
  IsBoolean,
  IsMongoId,
  IsOptional,
  ValidateNested,
  IsNumber
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';

export class RegionUpdateModel {
  @ValidateNested()
  @IsOptional()
  @ApiProperty({required: false})
  name?: LocalizeStringModel;

  @IsString({each: true})
  @IsOptional()
  @ApiProperty({required: false})
  subTypes?: string[];

  @IsOptional()
  @IsMongoId({each: true})
  @ApiProperty({required: false})
  ancestors?: string[];

  @IsOptional()
  @IsMongoId()
  @ApiProperty({required: false})
  parent?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({required: false})
  isActive?: boolean;

  @IsOptional()
  filemeta?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({required: false})
  idx?: number;

  @IsOptional()
  @IsBoolean()
  isAddress?: boolean;
}
