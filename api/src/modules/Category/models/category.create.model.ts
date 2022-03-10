import {
  IsString,
  IsMongoId,
  ValidateNested,
  IsOptional,
  IsBoolean,
  IsNumber
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';

export class CategoryCreateModel {
  @IsString()
  @ApiProperty({description: 'unique code of category'})
  code?: string;

  @ValidateNested()
  @ApiProperty({description: 'name'})
  name: LocalizeStringModel;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'icon for display'})
  icon?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'parent of this category'})
  parent?: string;

  @IsMongoId({each: true})
  @ApiProperty({description: 'all parents of this category'})
  ancestors: string[];

  @IsString()
  @ApiProperty({
    description: 'category by type eg: subject, industry, etc.'
  })
  type: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({description: 'is category active'})
  isActive?: boolean;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'category workspace'})
  workspace?: string;

  @IsOptional()
  @IsNumber()
  idx?: number;
}
