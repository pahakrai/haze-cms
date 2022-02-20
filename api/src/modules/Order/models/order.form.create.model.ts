import {
  IsInt,
  IsNumber,
  IsEnum,
  IsDate,
  IsString,
  IsMongoId,
  IsOptional,
  ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

import {OrderProductCreateModel} from '../submodules/OrderProduct/models';
import {OrderTimeCreateModel} from '../submodules/OrderTime/models';
import {OrderWageCreateModel} from '../submodules/OrderWage/models';
import {AddressCreateModel} from 'src/modules/Address/models';
import {OrderServiceModel} from './order.service.model';
import {OrderChargeOtherModel} from './order.charge.other.model';
import {OrderContactModel} from './order.contact.model';

const {OrderType} = common.type;

export class OrderFormCreateModel {
  @IsString()
  @IsOptional()
  @IsEnum(OrderType)
  @ApiProperty({description: 'order type'})
  orderType: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({required: false, description: 'client who place the order'})
  client?: string;

  @IsOptional()
  @IsString()
  clientDevice?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'exist if create order from quotation'
  })
  quotation?: string;

  @IsDate()
  @IsOptional()
  date?: Date;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'pick up store id if applicable'})
  pickupStore?: string;

  @IsMongoId()
  @ApiProperty({description: 'shipping address id'})
  @IsOptional()
  contactAddressId?: string;

  @ValidateNested()
  @ApiProperty({description: 'shipment address'})
  @IsOptional()
  contactAddress?: AddressCreateModel;

  @IsMongoId()
  @ApiProperty({description: 'card billing address id'})
  @IsOptional()
  billingContactId?: string;

  @ValidateNested()
  @ApiProperty({description: 'card billing address'})
  @IsOptional()
  billingContact?: AddressCreateModel;

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
  @Type(() => OrderWageCreateModel)
  wage?: OrderWageCreateModel;

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderProductCreateModel)
  product?: OrderProductCreateModel;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsInt()
  @IsOptional()
  status?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'coupon code'})
  coupon?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: 'order payment method'})
  paymentMethod?: string;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => OrderChargeOtherModel)
  @ApiProperty({required: false, description: 'other charges'})
  others?: OrderChargeOtherModel[];

  @IsOptional()
  @ValidateNested()
  contact?: OrderContactModel;

  @IsOptional()
  @ValidateNested()
  consignee?: OrderContactModel;

  @IsOptional()
  @IsNumber()
  baseCharge?: number;

  @IsOptional()
  @IsNumber()
  tips?: number;
}
