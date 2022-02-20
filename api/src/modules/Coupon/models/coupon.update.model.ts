import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsBoolean,
  ValidateNested
} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {CouponCriteriaModel, CouponEffectModel} from './coupon.criteria.model';

export class CouponUpdateModel {
  @ApiPropertyOptional({required: false})
  @IsOptional()
  _id?: string;

  @ApiPropertyOptional({required: false})
  @IsString()
  @IsOptional()
  code: string;

  @ApiPropertyOptional({required: false})
  effect?: CouponEffectModel;

  @ApiPropertyOptional({required: false})
  @IsDate()
  @IsOptional()
  startAt?: Date;

  @ApiPropertyOptional({required: false})
  @IsDate()
  @IsOptional()
  expireAt?: Date;

  @ApiPropertyOptional({required: false})
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({required: false})
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({required: false})
  @IsOptional()
  images?: Array<any>;

  @ApiProperty({required: false})
  @ValidateNested()
  @IsOptional()
  criteria?: CouponCriteriaModel;

  @ApiPropertyOptional({required: false})
  @IsString()
  @IsOptional()
  workspace?: string;

  @ApiPropertyOptional({required: false})
  @IsNumber()
  @IsOptional()
  perUserRedeemLimit?: number;

  @ApiPropertyOptional({required: false})
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
