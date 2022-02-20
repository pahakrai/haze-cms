import {
  IsString,
  IsBoolean,
  IsMongoId,
  IsPositive,
  IsNumber,
  IsOptional
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class PricingCreateModel {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  workspace: string;

  @IsString()
  @ApiProperty({required: false})
  code?: string;

  @ApiProperty({required: false})
  @IsOptional()
  description?: any;

  @ApiProperty({required: true})
  currency: string;

  @IsPositive()
  @IsNumber({allowInfinity: false, allowNaN: false})
  amount: number;

  @ApiProperty({required: true})
  priceType: string;

  @ApiProperty({required: false})
  amountByHour?: number;

  @ApiProperty({required: false})
  effectiveDateFr?: string;

  @ApiProperty({required: false})
  effectiveDateTo?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsMongoId()
  @IsOptional()
  pricingService?: string;
}
