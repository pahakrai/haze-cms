import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class ContactUsModel {
  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsEmail()
  userEmail: string;
}
