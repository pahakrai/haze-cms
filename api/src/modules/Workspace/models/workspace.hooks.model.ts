import {IsString, IsOptional, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {HooksHeader} from './workspace.hooksHeader.model';

export class WorkspaceHooksModel {
  @ValidateNested({each: true})
  @Type(() => HooksHeader)
  headers: HooksHeader[];

  @IsString()
  @IsOptional()
  code?: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsString()
  @IsOptional()
  url?: string;
}
