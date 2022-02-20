import {
  IsInt,
  IsDate,
  IsEnum,
  IsEmpty,
  IsNumber,
  IsString,
  IsMongoId,
  // IsNotEmpty,
  IsOptional,
  ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

import {OrderChargeModel} from './order.charge.model';
import {OrderServiceModel} from './order.service.model';
import {OrderContactModel} from './order.contact.model';

export class OrderCreateModel {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  orderNo?: string;

  @IsMongoId()
  @IsOptional()
  quotation?: string;

  @IsInt()
  @ApiProperty({description: 'order status'})
  status: number;

  @IsOptional()
  @IsEnum(common.type.OrderType)
  @ApiProperty({description: 'order type'})
  orderType: string;

  @IsMongoId()
  @ApiProperty({description: 'client who place the order'})
  client: string;

  @IsOptional()
  @IsString()
  clientDevice?: string;

  @IsEmpty()
  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  workspace?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  charge?: OrderChargeModel;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => OrderServiceModel)
  services?: OrderServiceModel[];

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'pick up store id if applicable'})
  pickupStore?: string;

  @IsMongoId()
  @ApiProperty({required: true})
  billingContact: string;

  @IsMongoId()
  @ApiProperty({required: true})
  contactAddress: string;

  @IsOptional()
  @ValidateNested()
  contact?: OrderContactModel;

  @IsOptional()
  @ValidateNested()
  consignee?: OrderContactModel;

  @IsOptional()
  @IsNumber()
  creditRequired?: number;
}

export class OrderTunnelModel {
  @IsMongoId()
  tunnel: string;
}
