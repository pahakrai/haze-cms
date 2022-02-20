import {IsString, IsBoolean, IsOptional} from 'class-validator';

export class WorkspaceTypeMetaModel {
  @IsString()
  data: string;

  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @IsBoolean()
  @IsOptional()
  adminOnly?: boolean;
}
