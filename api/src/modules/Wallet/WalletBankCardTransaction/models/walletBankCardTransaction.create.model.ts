import {IsString, IsNumber} from 'class-validator';

export class WalletBankCardTransactionCreateModel {
  @IsString()
  walletBankCard: string;

  @IsString()
  event: string;

  @IsString()
  description: string;

  @IsNumber()
  change: number;

  @IsNumber()
  amount: number;

  stripeLog: any;
}
