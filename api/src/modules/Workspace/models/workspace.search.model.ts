import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import {IsString, IsOptional, IsNumber} from 'class-validator';

export class WorkspaceSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  code?: string;

  @IsNumber()
  @IsOptional()
  status?: number;
}
