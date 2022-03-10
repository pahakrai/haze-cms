import {
  IsString,
  IsBoolean,
  IsMongoId,
  IsOptional,
  ValidateNested,
  IsNumber
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';

export class CategoryUpdateModel {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'unique code of category'})
  code?: string;

  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional({description: 'name'})
  name: LocalizeStringModel;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'parent of this category'})
  parent?: string;

  @IsOptional()
  @IsMongoId({each: true})
  @ApiPropertyOptional({description: 'all parents of this category'})
  ancestors?: string[];

  @IsOptional()
  @ApiPropertyOptional({
    description: 'category by type eg: subject, industry, etc.'
  })
  type?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({description: 'is category active'})
  isActive?: boolean;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'category workspace'})
  workspace?: string;

  @IsOptional()
  @IsNumber()
  idx?: number;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'icon for display'})
  icon?: string;
}
