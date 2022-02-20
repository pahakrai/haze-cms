import {
  IsDate,
  IsString,
  IsEnum,
  IsMongoId,
  IsOptional,
  ValidateNested
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {Type} from 'class-transformer';

// import {AddressCreateModel} from 'src/modules/Address/models';
// import {AddressUpdateModel} from 'src/modules/Address/models';
import {QuotationDetailModel} from './index';
import {OrderServiceModel} from '../../Order/models/order.service.model';
import {OrderChargeModel} from '../../Order/models/order.charge.model';
import {OrderContactModel} from '../../Order/models/order.contact.model';

import common from '@golpasal/common';
const {OrderType} = common.type;
export class QuotationUpdateModel {
  @IsString()
  @IsEnum(OrderType)
  @IsOptional()
  @ApiPropertyOptional({description: 'order type'})
  orderType?: string;

  @IsOptional()
  @ApiPropertyOptional({description: 'client object id'})
  client?: string;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({description: 'date of quotation'})
  quotationDate?: Date;

  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional({description: 'contact of quotation'})
  contact?: OrderContactModel;

  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional({description: 'consignee of quotation, optional'})
  consignee?: OrderContactModel;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'contact address of quotation, optional'})
  contactAddress?: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'billing address of quotation, optional'})
  billingContact?: string;

  @ValidateNested({each: true})
  @Type(() => QuotationDetailModel)
  details: QuotationDetailModel[];

  @ValidateNested()
  @IsOptional()
  @ApiPropertyOptional({description: 'charge model of quotation, optional'})
  charge?: OrderChargeModel;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => OrderServiceModel)
  @ApiPropertyOptional({description: 'services provide of quotation, optional'})
  services?: OrderServiceModel[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({description: 'remarks of quotation, optional'})
  remarks?: string;
}
