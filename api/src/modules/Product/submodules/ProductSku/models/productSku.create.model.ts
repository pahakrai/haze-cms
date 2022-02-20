import {
  Min,
  IsInt,
  IsNumber,
  IsString,
  IsMongoId,
  IsOptional,
  ValidateNested,
  IsBoolean,
  IsDate
} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {ProductSkuSpecsModel} from './productSku.specs.model';

export class ProductSkuCreateModel {
  @IsMongoId()
  @ApiProperty({
    description: 'generated in frontend in order to handle file upload'
  })
  _id: string;

  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  product: string;

  @IsString()
  @ApiProperty({description: 'code from productSku'})
  code: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'image id of FileMetas'})
  image?: string;

  @IsString()
  currency: string;

  @ValidateNested({each: true})
  specs: ProductSkuSpecsModel[];

  @Min(0)
  @IsNumber()
  amount: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @Min(1)
  @IsInt()
  @IsOptional()
  idx: number;

  @Min(0)
  @IsInt()
  qty: number;

  @Min(0)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'max amount allowed for user to add to cart'
  })
  maxAllow?: number;

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
