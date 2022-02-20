import common from '@golpasal/common';
import {IsEnum, IsString, IsOptional} from 'class-validator';

export class UserIsDuplicateUsernameModel {
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEnum(common.type.UserType)
  userType?: string;
}
