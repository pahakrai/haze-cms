import {IsString} from 'class-validator';

export class AuthValidatePasscodeTokenModel {
  @IsString()
  token: string;
}
