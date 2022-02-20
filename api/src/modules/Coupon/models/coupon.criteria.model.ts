import {IsString, IsEnum, IsOptional} from 'class-validator';
import common from '@golpasal/common';
import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {ObjectId} from 'mongodb';
const {OrderCreditAmountType} = common.type;

export class CouponCriteriaModel {
  @ApiProperty({required: false})
  @IsString({each: true})
  @IsOptional()
  paymentMethods?: string[];

  @ApiProperty({required: false})
  @IsOptional()
  // @Transform((products: string[]) => {
  //   if (!products) return [];
  //   return products.map(p => new ObjectId(p));
  // })
  products?: ObjectId[];

  @ApiProperty({required: true})
  @IsString()
  amount: string;
}

export class CouponEffectModel {
  @ApiProperty({required: true})
  @IsString()
  @IsEnum(OrderCreditAmountType)
  type: string;

  @ApiProperty({required: true})
  @IsString()
  amount: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  @IsEnum(OrderCreditAmountType)
  creditType?: string;
}
