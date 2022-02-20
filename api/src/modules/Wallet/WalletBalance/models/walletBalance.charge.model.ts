import {IsString, IsNumber, IsBoolean} from 'class-validator';

export class WalletBalanceChargeModel {
  @IsString()
  balanceId: string;

  @IsNumber()
  amount: number;

  @IsString()
  event: string;

  @IsString()
  description: string;

  @IsBoolean()
  enforcePositiveBalance: boolean;
}
