import {
  Min,
  IsIn,
  IsUrl,
  IsDate,
  Matches,
  IsNumber,
  IsString,
  IsMongoId,
  IsOptional
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class WorkspaceSubscriptionInvoiceCreateModel {
  @IsString()
  @ApiProperty({description: 'unique invoice number'})
  invoiceNo: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'subscription id'})
  subscription?: string;

  @IsString()
  @Matches(/^in_/)
  @ApiProperty({description: 'stripe invoice id'})
  stripeInvoiceId: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({description: 'stripe invoice receipt url'})
  stripeInvoiceUrl?: string;

  @IsDate()
  @ApiProperty({description: 'issuing date of invoice'})
  date: Date;

  @IsDate()
  @ApiProperty({})
  periodFr: Date;

  @IsDate()
  @ApiProperty({})
  periodTo: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'currency', required: false})
  currency?: string;

  @Min(0)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  })
  @ApiProperty({description: 'invoice amount'})
  amount: number;

  @IsString()
  @IsIn(['draft', 'open', 'paid', 'void', 'uncollectable'])
  @ApiProperty({description: 'invoice status'})
  status: string;

  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  workspace: string;
}
