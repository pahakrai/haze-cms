import {IsString, IsOptional} from 'class-validator';

export class WorkspaceMetaModel {
  @IsString()
  @IsOptional()
  'og:url'?: string;

  @IsString()
  @IsOptional()
  'og:site_name'?: string;

  @IsString()
  @IsOptional()
  'og:locale'?: string;

  @IsString()
  @IsOptional()
  'og:title'?: string;

  @IsString()
  @IsOptional()
  'og:type'?: string;

  @IsString()
  @IsOptional()
  'fb:pages'?: string;

  @IsString()
  @IsOptional()
  'fb:app_id'?: string;
}
