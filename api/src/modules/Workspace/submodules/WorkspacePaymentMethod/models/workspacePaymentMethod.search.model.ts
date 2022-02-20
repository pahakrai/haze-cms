import {IsString, IsOptional, IsMongoId, IsBoolean} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class WorkspacePaymentMethodSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString()
  platform?: string;

  @IsMongoId()
  @IsOptional()
  paymentMethod?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
