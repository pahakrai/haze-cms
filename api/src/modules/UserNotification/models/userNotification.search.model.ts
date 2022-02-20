import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import {IsString, IsOptional} from 'class-validator';

export class UserNotificationSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString({each: true})
  senders?: string[];

  @IsOptional()
  @IsString({each: true})
  users?: string[];
}
