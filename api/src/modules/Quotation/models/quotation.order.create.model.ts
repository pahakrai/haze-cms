import {IsOptional, IsMongoId, ValidateNested} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

import {AddressCreateModel} from 'src/modules/Address/models';

import {OrderContactModel} from '../../Order/models/order.contact.model';

export class QuotationOrderModel {
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
}
