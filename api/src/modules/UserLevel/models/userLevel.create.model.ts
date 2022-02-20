import {ValidateNested, IsEnum, IsBoolean} from 'class-validator';
import {LocalizeStringModel} from 'src/core';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

export class UserLevelCreateModel {
  @ValidateNested()
  name: LocalizeStringModel;

  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  workspace?: string;

  @IsEnum(common.type.UserType)
  @ApiProperty({description: 'userType of userLevel'})
  userType: string;

  @IsBoolean()
  @ApiProperty({description: 'isActive of userLevel'})
  isActive: boolean;
}
