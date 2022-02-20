import {IsString, IsOptional, IsInt} from 'class-validator';
// import {ApiProperty} from '@nestjs/swagger';

export class WorkspaceSettingModel {
  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  favicon?: string;

  @IsString()
  @IsOptional()
  headerLogo?: string;

  @IsString()
  @IsOptional()
  loginBackgroundImage?: string;

  @IsString()
  @IsOptional()
  theme?: string;

  @IsInt()
  @IsOptional()
  ratingMaxValue?: number;
}
