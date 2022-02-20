import {IsString, IsOptional} from 'class-validator';

export class EnquiryCreateModel {
  @IsOptional()
  @IsString()
  input: string;

  @IsOptional()
  @IsString()
  contactType: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
