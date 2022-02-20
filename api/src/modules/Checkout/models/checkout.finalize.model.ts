import {IsString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CheckoutFinalizeModel {
  @IsString()
  @IsOptional()
  @ApiProperty({description: 'stripe source id'})
  sourceId?: string;

  @IsString()
  @ApiProperty({description: 'payment method'})
  paymentMethod: string;
}
