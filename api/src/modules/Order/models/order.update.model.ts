import {IsOptional, IsMongoId, IsString, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {ValidateNested, IsDate} from 'class-validator';

// import {OrderContactModel} from './order.contact.model';
import {OrderChargeModel} from './order.charge.model';
import {AddressUpdateModel} from 'src/modules/Address/models';
import {OrderServiceModel} from './order.service.model';
import {OrderContactModel} from './order.contact.model';

export class OrderUpdateModel {
  @IsString()
  @IsOptional()
  orderNo?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({required: false, description: 'client who place the order'})
  client?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @ValidateNested({each: true})
  @IsOptional()
  charges?: Array<OrderChargeModel>;

  @IsOptional()
  @IsNumber()
  status?: number;

  @IsOptional()
  @IsDate()
  completeTime?: Date;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'pick up store id if applicable'})
  pickupStore?: string;

  // @IsMongoId()
  // @IsOptional()
  // billingContactId?: string;

  @ValidateNested()
  @IsOptional()
  billingContact?: AddressUpdateModel;

  // @IsMongoId()
  // @IsOptional()
  // contactId?: string;

  @ValidateNested()
  @IsOptional()
  contactAddress?: AddressUpdateModel;

  @IsOptional()
  @ValidateNested()
  contact?: OrderContactModel;

  @IsOptional()
  @ValidateNested()
  consignee?: OrderContactModel;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => OrderServiceModel)
  services?: OrderServiceModel[];

  @IsMongoId()
  @IsOptional()
  signature?: string;
}
