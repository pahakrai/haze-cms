import {IsString, IsOptional, IsNumber} from 'class-validator';

export class WalletBankCardUpdateModel {
  @IsString()
  @IsOptional()
  wallet?: string;

  default?: boolean;

  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsOptional()
  expiryMonth?: number;

  @IsNumber()
  @IsOptional()
  expiryYear?: number;

  @IsString()
  @IsOptional()
  fullName?: string;
}
