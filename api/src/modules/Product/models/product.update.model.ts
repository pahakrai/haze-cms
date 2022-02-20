import {
  IsString,
  IsOptional,
  ValidateNested,
  IsMongoId,
  IsNumber
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';
import {ProductPriceRangeModel} from './product.price.range.model';
import {ProductMediaListModel} from './product.medialist.model';

export class ProductUpdateModel {
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional({description: 'name of product, which is unique'})
  name?: LocalizeStringModel;

  @IsOptional()
  @ValidateNested()
  description?: LocalizeStringModel;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({description: 'category.code of product'})
  _category?: string;

  @IsOptional()
  @ValidateNested({each: true})
  content?: LocalizeStringModel;

  @IsOptional()
  @IsMongoId({each: true})
  @ApiPropertyOptional({description: 'product images'})
  images?: string[];

  @IsOptional()
  @IsString({each: true})
  platformTypes?: string[];

  @IsOptional()
  @ValidateNested()
  mediaList1?: ProductMediaListModel[];

  @IsOptional()
  @ValidateNested()
  mediaList2?: ProductMediaListModel[];

  @IsOptional()
  @ValidateNested()
  mediaList3?: ProductMediaListModel[];

  @IsOptional()
  @IsString()
  remarks?: string;

  @ApiPropertyOptional({description: 'DO NOT PASS FROM FRONTEND'})
  workspace?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({description: 'product active status'})
  status?: number;

  @ApiPropertyOptional({description: 'DO NOT PASS FROM FRONTEND'})
  priceRange?: ProductPriceRangeModel;

  @IsOptional()
  tags?: Array<any>;

  @IsOptional()
  @IsMongoId()
  placeOfOrigin?: string;

  @IsOptional()
  @IsMongoId({each: true})
  types?: string[];
}
