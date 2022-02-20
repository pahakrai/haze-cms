import {
  IsDate,
  IsString,
  IsEnum,
  IsMongoId,
  IsOptional,
  ValidateNested
} from 'class-validator';

import {AddressUpdateModel} from 'src/modules/Address/models';
import {Type} from 'class-transformer';

import {QuotationDetailModel} from './index';
import {OrderServiceModel} from '../../Order/models/order.service.model';
import {OrderChargeModel} from '../../Order/models/order.charge.model';
import {OrderContactModel} from '../../Order/models/order.contact.model';

import common from '@golpasal/common';
const {OrderType} = common.type;

export class QuotationFormUpdateModel {
  @IsString()
  @IsEnum(OrderType)
  @IsOptional()
  orderType?: string;

  @IsOptional()
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
  @IsOptional()
  contactAddressId?: string;

  @ValidateNested()
  @IsOptional()
  contactAddress?: AddressUpdateModel;

  @IsMongoId()
  @IsOptional()
  billingContactId?: string;

  @ValidateNested()
  @IsOptional()
  billingContact?: AddressUpdateModel;

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
