import {
  Min,
  IsIn,
  IsDate,
  Matches,
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class WorkspaceSubscriptionInvoiceUpdateModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'subscription id'})
  subscription: string;

  @IsString()
  @IsOptional()
  @Matches(/^in_/)
  @ApiPropertyOptional({description: 'stripe invoice id'})
  stripeInvoiceId?: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({description: 'issuing date of invoice'})
  date?: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'currency', required: false})
  currency?: string;

  @Min(0)
  @IsOptional()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  })
  @ApiPropertyOptional({description: 'invoice amount'})
  amount: number;

  @IsString()
  @IsOptional()
  @IsIn(['draft', 'open', 'paid', 'void', 'uncollectable'])
  @ApiPropertyOptional({description: 'invoice status'})
  status: string;
}
