/* eslint-disable max-len */
import {IsString, IsOptional} from 'class-validator';
export class ProviderWorkspaceConfirmModel {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  password: any;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;
}
