import {IsString, IsOptional} from 'class-validator';

export class UserCreditGetBalanceModel {
  @IsString()
  amountType: string;

  @IsString()
  @IsOptional()
  currency?: string;
}
