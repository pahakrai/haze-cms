import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {CouponCriteriaModel, CouponEffectModel} from './coupon.criteria.model';

export class CouponCreateModel {
  @ApiProperty({required: true})
  @IsString()
  code: string;

  @ApiProperty({required: false})
  @IsDate()
  @IsOptional()
  startAt?: Date;

  @ApiProperty({required: false})
  @IsDate()
  @IsOptional()
  expireAt?: Date;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({required: true})
  @IsOptional()
  images?: Array<any>;

  @ApiProperty({required: true})
  @IsNumber()
  noOfCoupon: number;

  @ApiProperty({required: false})
  @IsNumber()
  @IsOptional()
  perUserRedeemLimit?: number;

  @ApiProperty({required: true})
  @IsString()
  currency: string;

  @ApiProperty({required: true})
  effect: CouponEffectModel;

  @ApiProperty({required: false})
  criteria: CouponCriteriaModel;

  @ApiProperty({})
  workspace: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({description: 'is coupon active'})
  isActive?: boolean;
}
