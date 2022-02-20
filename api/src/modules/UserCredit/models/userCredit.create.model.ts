import {
  IsString,
  IsOptional,
  IsMongoId,
  IsPositive,
  IsEnum
} from 'class-validator';
import common from '@golpasal/common';

const {AmountType, TransactionType} = common.type;

export class UserCreditCreateModel {
  @IsMongoId()
  user: string;

  @IsOptional()
  transactionDate?: string | Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TransactionType)
  transactionType: string;

  @IsEnum(AmountType)
  amountType: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsPositive()
  amount: number;

  @IsPositive()
  @IsOptional()
  balance?: number;
}
