import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class DashboardSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString({each: true})
  workspaces?: Array<string>;

  @IsString()
  @IsOptional()
  widgetType?: string;
}
