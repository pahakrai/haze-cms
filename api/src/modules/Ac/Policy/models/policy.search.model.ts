import {IsString, IsBoolean, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class PolicySearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  action?: string;

  @IsString({each: true})
  @IsOptional()
  _ids?: string[];

  @IsBoolean()
  @IsOptional()
  workspaceTypesFilter?: boolean;

  @IsBoolean()
  @IsOptional()
  workspaceAccessFilter?: boolean;
}
