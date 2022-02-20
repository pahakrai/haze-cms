import {IsString, IsMongoId, IsOptional} from 'class-validator';

export class AuthForgotPasswordModel {
  @IsString()
  input: string;

  @IsMongoId()
  @IsOptional()
  workspace?: string;

  @IsString()
  @IsOptional()
  transportType?: string;

  @IsString()
  @IsOptional()
  interactType?: string;
}
