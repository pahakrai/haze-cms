import {IsString, IsOptional, IsNumber} from 'class-validator';
export class WalletBalanceUpdateModel {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;
}
