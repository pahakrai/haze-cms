import {IsString, IsBoolean, IsMongoId, IsOptional} from 'class-validator';

export class AuthResetPasswordModel {
  @IsString()
  passcodeToken: string;

  @IsString()
  password: string;

  @IsMongoId()
  @IsOptional()
  workspace: string;

  @IsBoolean()
  @IsOptional()
  updateUserVerify?: boolean;
}
