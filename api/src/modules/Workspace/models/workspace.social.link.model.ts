import {IsOptional} from 'class-validator';

import {WorkspaceNameUrlModel} from './workspace.name.url.model';

export class WorkspaceSocialLinkModel {
  @IsOptional()
  facebook?: WorkspaceNameUrlModel;

  @IsOptional()
  youtube?: WorkspaceNameUrlModel;

  @IsOptional()
  instagram?: WorkspaceNameUrlModel;

  @IsOptional()
  code?: WorkspaceNameUrlModel;

  @IsOptional()
  baidu?: WorkspaceNameUrlModel;

  @IsOptional()
  youku?: WorkspaceNameUrlModel;
}
