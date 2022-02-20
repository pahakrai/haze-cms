import {IsString, IsBoolean, IsOptional, IsNumber} from 'class-validator';

export class WalletBankCardChargeModel {
  @IsString()
  @IsOptional()
  cardId?: string;

  @IsString()
  @IsOptional()
  sourceId?: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsBoolean()
  chargeImmediately: boolean;

  @IsString()
  description: string;

  @IsBoolean()
  enforcePositiveBalance: boolean;

  @IsString()
  @IsOptional()
  stripeKey?: string;
}
