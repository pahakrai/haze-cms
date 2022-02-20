import {IsString, IsOptional} from 'class-validator';

export class WorkspaceNameUrlModel {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  url?: string;
}
