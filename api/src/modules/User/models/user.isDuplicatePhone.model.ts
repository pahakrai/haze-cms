import common from '@golpasal/common';
import {IsEnum, IsString, IsOptional} from 'class-validator';

export class UserIsDuplicatePhoneModel {
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEnum(common.type.UserType)
  userType?: string;
}
