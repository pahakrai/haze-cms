import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class NotificationScheduleSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString()
  statuses?: number[];

  @IsOptional()
  @IsString({each: true})
  toGroups?: string[];
}
