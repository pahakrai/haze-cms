import {
  IsString,
  IsMongoId,
  IsOptional,
  IsInt,
  IsDate,
  IsEnum,
  ValidateNested
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import common from '@golpasal/common';

// import {AddressCreateModel} from 'src/modules/Address/models';
import {QuotationDetailModel} from './index';
import {OrderServiceModel} from '../../Order/models/order.service.model';
import {OrderChargeModel} from '../../Order/models/order.charge.model';
import {OrderContactModel} from '../../Order/models/order.contact.model';

const {OrderType} = common.type;

export class QuotationCreateModel {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsMongoId()
  @IsOptional()
  workspace?: string;

  @IsString()
  @IsOptional()
  quotationNo?: string;

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
  contactAddress?: string;

  @IsMongoId()
  @ApiProperty({description: 'card billing address'})
  @IsOptional()
  billingContact?: string;

  @ValidateNested({each: true})
  @Type(() => QuotationDetailModel)
  details: QuotationDetailModel[];

  @IsOptional()
  charge?: OrderChargeModel;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => OrderServiceModel)
  services?: OrderServiceModel[];

  @IsInt()
  @IsOptional()
  @ApiProperty({description: 'quotation status'})
  status?: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}
