import {IsString, IsNumber, IsOptional} from 'class-validator';

export class WalletBalanceCreateModel {
  @IsString()
  @IsOptional()
  wallet?: string;

  @IsString()
  type: string;

  @IsNumber()
  amount: number;
}
