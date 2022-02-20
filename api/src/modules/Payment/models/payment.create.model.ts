import {
  IsOptional,
  IsMongoId,
  IsEnum,
  // IsArray,
  ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

import {PaymentTransactionModel} from './payment.transaction.model';

const {PaymentStatus} = common.status;

export class PaymentCreateModel {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'order id'})
  order?: string;

  @IsOptional()
  @IsEnum(PaymentStatus)
  @ApiProperty({description: 'payment status'})
  status?: number;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => PaymentTransactionModel)
  @ApiProperty({description: 'transaction details'})
  transactions?: PaymentTransactionModel[];
}
