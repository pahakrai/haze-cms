import {IsString, IsOptional, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {WorkspaceHooksModel} from './workspace.hooks.model';

export class WorkspaceIntegrationsModel {
  @IsString()
  @IsOptional()
  app?: string;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => WorkspaceHooksModel)
  hooks?: WorkspaceHooksModel[];
}
