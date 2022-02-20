import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class GroupSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString({each: true})
  users?: string[];

  @IsOptional()
  @IsString({each: true})
  policies?: string[];

  @IsOptional()
  @IsString({each: true})
  policiesNotIn?: string[];
}
