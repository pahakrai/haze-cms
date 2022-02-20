import {IsString, IsOptional} from 'class-validator';

class ContactPhoneModel {
  number: string;
  phoneRegionCode: string;
}

export class ContactModel {
  @IsOptional()
  phone?: ContactPhoneModel;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  fax?: string;

  @IsString()
  @IsOptional()
  department?: string;
}
