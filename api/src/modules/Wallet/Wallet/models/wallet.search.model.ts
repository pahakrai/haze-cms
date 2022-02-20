import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
export class WalletSearchModel extends BaseSearchModel {
  // email address of user
  @IsString()
  @IsOptional()
  email?: string;

  // wallet name
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;
}
