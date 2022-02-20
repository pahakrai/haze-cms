import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class PhoneRegionSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  code?: string;
}
