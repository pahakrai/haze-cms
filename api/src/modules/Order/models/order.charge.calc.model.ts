import {
  IsEnum,
  IsNumber,
  IsString,
  IsMongoId,
  IsOptional,
  ValidateNested
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

import {OrderProductCreateModel} from '../submodules/OrderProduct/models';
import {OrderTimeCreateModel} from '../submodules/OrderTime/models';
import {Type} from 'class-transformer';
import {OrderServiceModel} from './order.service.model';
import {OrderChargeOtherModel} from './order.charge.other.model';

const {OrderType} = common.type;

export class OrderChargeCalculationModel {
  @IsString()
  @IsOptional()
  @IsEnum(OrderType)
  @ApiProperty({description: 'order type'})
  orderType?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'exist if create order from quotation'
  })
  quotation?: string;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => OrderServiceModel)
  services?: OrderServiceModel[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderTimeCreateModel)
  time?: OrderTimeCreateModel;

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderProductCreateModel)
  product?: OrderProductCreateModel;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'coupon code'})
  coupon?: string;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => OrderChargeOtherModel)
  @ApiProperty({required: false, description: 'other charges'})
  others?: OrderChargeOtherModel[];

  @IsNumber()
  @IsOptional()
  baseCharge?: number;

  @IsNumber()
  @IsOptional()
  tips?: number;
}
