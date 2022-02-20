import {IsString, IsBoolean, IsOptional} from 'class-validator';

export class WorkspaceTypePreferenceModel {
  @IsString()
  preference: string;

  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @IsString()
  @IsOptional()
  ref?: string;
}
