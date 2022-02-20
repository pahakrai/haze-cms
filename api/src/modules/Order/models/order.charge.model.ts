import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  ValidateNested,
  IsEnum
} from 'class-validator';
import common from '@golpasal/common';

import {OrderChargeServiceModel} from './order.charge.service.model';
import {OrderChargeCouponModel} from './order.charge.coupon.model';
import {OrderChargeOtherModel} from './order.charge.other.model';
import {OrderChargeTunnelModel} from './order.charge.tunnel.model';

const {PriceType} = common.type;

export class OrderChargeModel {
  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @IsOptional()
  @IsBoolean()
  hasQuote?: boolean;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  base?: number;

  @IsOptional()
  @IsNumber()
  tips?: number;

  @IsOptional()
  @IsEnum(PriceType)
  basePriceType?: string;

  @IsOptional()
  @ValidateNested({each: true})
  coupons?: Array<OrderChargeCouponModel>;

  @ValidateNested({each: true})
  @IsOptional()
  services?: Array<OrderChargeServiceModel>;

  @ValidateNested({each: true})
  @IsOptional()
  others?: Array<OrderChargeOtherModel>;
}
