import {IsString} from 'class-validator';

export class ProviderUserModel {
  @IsString()
  email: string;
}
