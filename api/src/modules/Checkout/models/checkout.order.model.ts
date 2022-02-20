import {
  IsMongoId,
  IsOptional,
  ValidateIf,
  ValidateNested
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

import {OrderFormCreateModel} from 'src/modules/Order/models';
import {CheckoutPaymentModel} from './checkout.payment.model';

export class CheckoutOrderModel {
  @ValidateNested()
  @ValidateIf(o => o.orderId === undefined)
  @ApiProperty({description: 'create order form'})
  order?: OrderFormCreateModel;

  @IsOptional()
  @IsMongoId()
  orderId?: string;

  @IsOptional()
  @ValidateNested()
  payment?: CheckoutPaymentModel;
}
