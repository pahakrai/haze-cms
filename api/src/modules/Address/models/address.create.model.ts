import {
  IsIn,
  IsString,
  IsOptional,
  IsMongoId,
  IsBoolean
} from 'class-validator';
import {LocationGeometryModel} from './address.location.geometry.model';

export class AddressCreateModel {
  @IsMongoId()
  @IsOptional()
  workspace?: string;

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

  @IsMongoId()
  @IsOptional()
  ref?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  address1?: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  @IsOptional()
  postCode?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  geometry?: LocationGeometryModel;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
