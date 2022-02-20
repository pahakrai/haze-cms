import {
  Min,
  IsNumber,
  IsString,
  IsMongoId,
  IsOptional,
  ValidateNested,
  IsBoolean,
  IsDate
} from 'class-validator';

import {ProductSkuSpecsModel} from './productSku.specs.model';

export class ProductSkuUpdateModel {
  @IsMongoId()
  @IsOptional()
  image?: string;

  @IsOptional()
  @ValidateNested({each: true})
  specs?: ProductSkuSpecsModel;

  @IsString()
  code: string;

  @IsString()
  currency: string;

  @Min(0)
  @IsNumber()
  @IsOptional()
  amount?: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @Min(1)
  @IsNumber()
  @IsOptional()
  idx?: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  qty?: number;

  @IsBoolean()
  @IsOptional()
  validateInventory?: boolean;

  @IsBoolean()
  @IsOptional()
  isQuote?: boolean;

  @IsOptional()
  @IsDate()
  expiryDate?: Date;
}
