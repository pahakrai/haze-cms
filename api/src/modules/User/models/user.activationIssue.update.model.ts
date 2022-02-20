import {IsString, IsOptional, IsDate, IsNumber, IsEnum} from 'class-validator';
import common from '@golpasal/common';

const {UserActivationIssuesStatus} = common.status;

export class UserActivationIssueUpdateModel {
  @IsString()
  _id?: any;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsDate()
  createdAt?: any;

  @IsOptional()
  @IsNumber()
  @IsEnum(UserActivationIssuesStatus)
  status?: number;
}
