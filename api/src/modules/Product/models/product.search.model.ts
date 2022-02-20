import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  IsDate,
  ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
// import {LocationInputModel} from 'src/core';

export class ProductSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({description: 'category of product'})
  category?: string;

  @IsOptional()
  @IsString({each: true})
  categories?: Array<string>;

  @IsOptional()
  status?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({description: 'priceFr of product'})
  priceFr?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({description: 'priceTo of product'})
  priceTo?: number;

  @IsOptional()
  @IsString({each: true})
  @ApiPropertyOptional({description: 'platformTypes of product'})
  platformTypes?: Array<string>;

  @IsInt({each: true})
  @Type(() => Number)
  @IsOptional()
  statuses?: Array<number>;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString({each: true})
  tags?: string[];

  @IsOptional()
  placeOfOrigin?: string;

  @IsOptional()
  @IsDate()
  expiryDateGte?: Date;

  @IsOptional()
  @IsDate()
  expiryDateLte?: Date;

  @IsOptional()
  @IsDate()
  productionDateFr?: Date;

  @IsOptional()
  @IsDate()
  productionDateTo?: Date;

  @IsOptional()
  @IsDate()
  productExpiryDateFr?: Date;

  @IsOptional()
  @IsDate()
  productExpiryDateTo?: Date;
}
