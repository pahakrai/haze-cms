import {IsString, IsNumber} from 'class-validator';

export class WalletBalanceTransactionCreateModel {
  @IsString()
  walletBalance: string;

  @IsString()
  event: string;

  @IsString()
  description: string;

  @IsNumber()
  change: number;

  @IsNumber()
  amount: number;
}
