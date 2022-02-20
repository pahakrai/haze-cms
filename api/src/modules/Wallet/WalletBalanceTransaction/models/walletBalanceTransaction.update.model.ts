import {IsString, IsOptional, IsNumber} from 'class-validator';

export class WalletBalanceTransactionUpdateModel {
  @IsString()
  @IsOptional()
  walletBalance: string;

  @IsString()
  @IsOptional()
  event: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  change: number;

  @IsNumber()
  @IsOptional()
  amount: number;
}
