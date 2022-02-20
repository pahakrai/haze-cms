import {IsOptional, IsMongoId, IsString} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class ProductReviewSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'product that review for'})
  product?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'rating that review for'})
  rating?: string;
}
