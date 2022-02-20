import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class AutoNumberTemplateSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  subType?: string;
}
