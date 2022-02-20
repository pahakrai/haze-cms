import common from '@golpasal/common';
import {IsString, IsOptional, IsEnum} from 'class-validator';

export class UserIsDuplicateEmailModel {
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEnum(common.type.UserType)
  userType?: string;
}
