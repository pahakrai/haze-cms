import {IsOptional, IsBoolean, IsEnum} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import common from '@golpasal/common';

export class UserLevelSearchModel extends BaseSearchModel {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({description: 'is active'})
  isActive?: boolean;

  @IsEnum(common.type.UserType)
  @IsOptional()
  @ApiPropertyOptional({description: 'userType of userLevel'})
  userType?: string;
}
