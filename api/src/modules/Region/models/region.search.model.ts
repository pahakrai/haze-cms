import {IsString, IsBoolean, IsOptional, IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class RegionSearchModel extends BaseSearchModel {

  
  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: 'region code'})
  code?: string;

  @IsOptional()
  @IsString({each: true})
  @ApiProperty({required: false, description: 'region code'})
  codes?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({required: false})
  isActive?: boolean;

  @IsOptional()
  @IsString({each: true})
  @ApiProperty({required: false})
  types?: string[];

  @IsOptional()
  @IsString({each: true})
  @ApiProperty({required: false})
  subTypes?: string[];

  @IsOptional()
  @IsMongoId({each: true})
  @ApiProperty({required: false})
  ancestors?: string[];

  @IsOptional()
  @IsString({each: true})
  @ApiProperty({required: false, description: 'region code'})
  ancestorCodes?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  parent?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  parentCode?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({required: false})
  recursive?: boolean;

  @IsBoolean()
  @IsOptional()
  isAddress?: boolean;
}
