import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
export class WalletBalanceSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  wallet?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString({each: true})
  @IsOptional()
  types?: string[];
}
