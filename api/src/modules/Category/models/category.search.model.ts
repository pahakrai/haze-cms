import {IsOptional, IsMongoId, IsBoolean} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class CategorySearchModel extends BaseSearchModel {
  @IsOptional()
  @ApiPropertyOptional({description: 'code of this category'})
  code?: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'parent of this category'})
  parent?: string;

  @IsOptional()
  @IsMongoId({each: true})
  @ApiPropertyOptional({description: 'all parents of this category'})
  ancestors?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({description: 'is category active'})
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({description: 'recursively get categories'})
  recursive?: boolean;
}
