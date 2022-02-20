import {IsString} from 'class-validator';

export class AuthSetCurrentUserPasswordModel {
  @IsString()
  password: string;
}
