import {
  IsOptional,
  IsMongoId,
  ValidateNested,
  IsString,
  IsEnum,
  IsDate
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import common from '@golpasal/common';
import {AddressCreateModel} from 'src/modules/Address/models';

import {QuotationDetailModel} from './index';
import {OrderServiceModel} from '../../Order/models/order.service.model';
import {OrderChargeModel} from '../../Order/models/order.charge.model';
import {OrderContactModel} from '../../Order/models/order.contact.model';

const {OrderType} = common.type;

export class QuotationformCreateModel {
  @IsString()
  @IsEnum(OrderType)
  @ApiProperty({description: 'order type'})
  orderType: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'client who place the order'})
  client?: string;

  @IsOptional()
  @IsDate()
  quotationDate?: Date;

  @IsOptional()
  @ValidateNested()
  contact?: OrderContactModel;

  @IsOptional()
  @ValidateNested()
  consignee?: OrderContactModel;

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

  @ValidateNested({each: true})
  @Type(() => QuotationDetailModel)
  details: QuotationDetailModel[];

  @ValidateNested()
  @IsOptional()
  charge?: OrderChargeModel;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => OrderServiceModel)
  services?: OrderServiceModel[];

  @IsOptional()
  @IsString()
  remarks?: string;
}
