import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class WorkspacePhoneRegionSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  workspace?: string;
}
