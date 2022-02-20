import {IsOptional, IsMongoId} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class ProductWatchUpdateModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'user who watch a product'})
  client?: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'product which being watched by client'})
  product?: string;
}
