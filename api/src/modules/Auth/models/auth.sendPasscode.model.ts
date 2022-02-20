import {IsString, IsMongoId, IsOptional} from 'class-validator';

export class AuthSendPasscodeModel {
  @IsString()
  input: string;

  @IsMongoId()
  @IsOptional()
  workspace?: string;

  @IsOptional()
  @IsString()
  contactMethod?: string;

  @IsOptional()
  @IsString()
  transportType?: string;

  @IsOptional()
  @IsString()
  interactType?: string;
}
