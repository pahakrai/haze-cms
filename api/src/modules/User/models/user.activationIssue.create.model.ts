import {IsString, IsOptional, IsDate, IsNumber, IsEnum} from 'class-validator';
import common from '@golpasal/common';

const {UserActivationIssuesStatus} = common.status;

export class UserActivationIssueCreateModel {
  @IsString()
  reason: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsNumber()
  @IsEnum(UserActivationIssuesStatus)
  status?: number;
}
