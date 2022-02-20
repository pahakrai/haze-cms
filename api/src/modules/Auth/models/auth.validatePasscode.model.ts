import {IsString, IsOptional, IsMongoId} from 'class-validator';

export class AuthValidatePasscodeModel {
  @IsString()
  @IsOptional()
  input?: string;

  @IsMongoId()
  @IsOptional()
  workspace?: string;

  @IsString()
  passcode: string;
}
