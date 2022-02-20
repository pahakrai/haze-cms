import {IsString, IsOptional, IsMongoId, IsIn} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class AddressSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsMongoId()
  @IsOptional()
  ref?: string;

  @IsString()
  @IsOptional()
  @IsIn(['Users', 'Members', 'Merchants', 'Orders', 'Stores', 'Quotation'])
  refType?:
    | 'Users'
    | 'Members'
    | 'Merchants'
    | 'Orders'
    | 'Stores'
    | 'Quotation';
}
