import {IsString, IsOptional} from 'class-validator';

export class LocalizeStringModel {
  @IsString()
  @IsOptional()
  en: string;

  @IsString()
  @IsOptional()
  'zh-hk': string;

  @IsString()
  @IsOptional()
  'zh-cn': string;
}
