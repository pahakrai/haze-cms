import {
  IsNumber,
  IsString,
  IsBoolean,
  IsInstance,
  IsOptional,
  ValidateNested
} from 'class-validator';
import {WalletBankCardCreateModel} from '../../WalletBankCard/models/walletBankCard.create.model';

export class WalletCreateModel {
  // email address of user
  @IsString()
  email: string;

  // wallet name
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  balance: number;

  @ValidateNested({each: true})
  @IsInstance(WalletBankCardCreateModel, {each: true})
  bankCards: WalletBankCardCreateModel[];

  @IsBoolean()
  @IsOptional()
  isEmailUnique?: boolean;
}
