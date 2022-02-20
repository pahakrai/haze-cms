import {IsString, IsOptional, IsMongoId} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class AutoNumberSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  subType?: string;

  @IsString()
  @IsOptional()
  prefix?: string;

  @IsMongoId()
  @IsOptional()
  workspace?: string;
}
