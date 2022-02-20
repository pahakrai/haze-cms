import {
  IsInt,
  IsDate,
  IsNumber,
  IsString,
  IsMongoId,
  IsOptional
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class PaymentTransactionModel {
  @IsString()
  @ApiProperty({description: 'payment method code'})
  _paymentMethod: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'transaction id from payment gateway'})
  id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'receipt No'})
  receiptNo?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({description: 'transaction date'})
  date?: Date;

  @IsNumber()
  @ApiProperty({description: 'amount of this transaction'})
  amount: number;

  @IsInt()
  @ApiProperty({description: 'transaction status'})
  status: number;

  @IsOptional()
  @IsMongoId({each: true})
  @ApiProperty({
    required: false,
    description: 'uploaded files for transaction proof'
  })
  files?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'remarks1'})
  remarks1?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'remarks2'})
  remarks2?: string;
}
