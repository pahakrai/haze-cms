import {IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class WebMenuSearchModel extends BaseSearchModel {
  @IsOptional()
  types?: Array<string>;

  @IsOptional()
  code?: string;
}
