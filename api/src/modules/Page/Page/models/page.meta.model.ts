import {IsString, IsNumber, IsOptional} from 'class-validator';

export class MetaModel {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  keywords?: string;

  @IsOptional()
  @IsNumber()
  version?: number;

  @IsOptional()
  @IsString()
  'og:url'?: string;

  @IsOptional()
  @IsString()
  'og:image'?: string;
}

export class ParamMetaModel {
  @IsOptional()
  meta?: MetaModel;
}
