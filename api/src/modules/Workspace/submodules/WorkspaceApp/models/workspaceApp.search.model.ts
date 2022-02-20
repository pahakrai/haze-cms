import {IsOptional, IsString} from 'class-validator';
import {BaseSearchModel} from 'src/core/models';

export class WorkspaceAppSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString()
  name?: string;
}
