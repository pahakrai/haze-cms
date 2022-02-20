import {
  IsInt,
  IsString,
  IsMongoId,
  IsOptional,
  ValidateNested,
  IsBoolean,
  IsDate
} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import {ProductSkuSpecsModel} from './productSku.specs.model';

export class ProductSkuSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  currnecy?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsMongoId()
  @IsOptional()
  product?: string;

  @IsInt()
  @IsOptional()
  idx?: number;

  @IsOptional()
  @ValidateNested({each: true})
  specs?: ProductSkuSpecsModel[];

  @IsBoolean()
  @IsOptional()
  validateInventory?: boolean;

  @IsBoolean()
  @IsOptional()
  isQuote?: boolean;

  @IsOptional()
  @IsDate()
  expiryDateLte?: Date;

  @IsOptional()
  @IsDate()
  expiryDateGte?: Date;
}
