import {IsString, IsOptional, IsMongoId} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class CouponSearchModel extends BaseSearchModel {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  workspace?: string;

  @ApiPropertyOptional()
  @IsMongoId({each: true})
  @IsOptional()
  workspaces?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  startAt?: any;

  @ApiPropertyOptional()
  @IsOptional()
  expireAt?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  user?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coord?: Array<number>;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  radius?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  isActive?: string | boolean;
}
