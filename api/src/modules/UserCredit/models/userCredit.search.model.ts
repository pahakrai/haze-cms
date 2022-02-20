import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class UserCreditSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  amountType?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  transactionType?: string;
}
