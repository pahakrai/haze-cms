import {IsString, IsBoolean, IsOptional, IsNumber} from 'class-validator';

export class WalletBankCardCreateModel {
  @IsString()
  wallet: string;

  @IsBoolean()
  default: boolean;

  @IsString()
  country: string;

  @IsString()
  brand: string;

  @IsString()
  funding: string;

  @IsString()
  last4Digit: string;

  @IsNumber()
  expiryMonth: number;

  @IsNumber()
  expiryYear: number;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  stripeSource: string;
}
