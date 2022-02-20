import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
export class WalletBankCardSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  wallet?: string;

  @IsString()
  @IsOptional()
  brand?: string;
}
