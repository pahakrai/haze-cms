import {IsEnum, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

const {PaymentMethod} = common.method;

export class CheckoutPaymentModel {
  @IsString()
  @IsEnum(PaymentMethod)
  @ApiProperty({description: 'payment method code'})
  paymentMethod: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'stripe source id'})
  sourceId?: string;
}
