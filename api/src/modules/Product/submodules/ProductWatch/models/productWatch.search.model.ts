import {IsMongoId, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class ProductWatchSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'user who watch a product'})
  client?: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'product which being watched by client'})
  product?: string;
}
