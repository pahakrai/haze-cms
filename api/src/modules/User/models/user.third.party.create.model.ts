import {IsString, IsOptional} from 'class-validator';

export class ThirdPartyUserCreateModel {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatars?: Array<any>;

  @IsOptional()
  @IsString()
  userTypes?: Array<string>;

  @IsOptional()
  @IsString()
  userId?: string;
}
