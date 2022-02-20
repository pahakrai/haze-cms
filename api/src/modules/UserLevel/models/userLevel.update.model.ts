import {ValidateNested, IsString, IsOptional, IsBoolean} from 'class-validator';
import {LocalizeStringModel} from 'src/core';
import {ApiProperty} from '@nestjs/swagger';
export class UserLevelUpdateModel {
  @ValidateNested()
  name?: LocalizeStringModel;

  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  workspace?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'userType of userLevel'})
  userType?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({description: 'isActive of userLevel'})
  isActive?: boolean;
}
