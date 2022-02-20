import {
  IsMongoId,
  IsInt,
  Min,
  IsString,
  IsNumber,
  IsOptional
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class OrderProductItem {
  @IsMongoId()
  @ApiProperty({description: 'item product id'})
  product: string;

  @IsMongoId()
  @ApiProperty({description: 'item SKU'})
  productSKU: string;

  @Min(1)
  @IsInt()
  qty: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @Min(0)
  @IsNumber()
  amount: number;
}
