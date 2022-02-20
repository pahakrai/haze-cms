import {
  Min,
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional,
  ValidateNested
} from 'class-validator';
import {LocalizeStringModel} from 'src/core';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {ProductPriceRangeModel} from './product.price.range.model';
import {ProductMediaListModel} from './product.medialist.model';

export class ProductCreateModel {
  @ValidateNested()
  @ApiProperty({
    description: 'name of product, which is unique'
  })
  name: LocalizeStringModel;

  @ValidateNested()
  description: LocalizeStringModel;

  @ApiProperty({
    description: 'category.code of product'
  })
  @IsString()
  _category: string;

  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  workspace: string;

  @ValidateNested()
  content: LocalizeStringModel;

  @IsOptional()
  @IsMongoId({each: true})
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

  @IsNumber()
  @ApiProperty({description: 'product status'})
  status: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'max amount allowed for user to add to cart'
  })
  maxAllow?: number;

  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
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
