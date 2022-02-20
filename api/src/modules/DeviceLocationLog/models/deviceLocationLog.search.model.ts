import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class DeviceLocationLogSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString({each: true})
  devices?: string[];
}
