import {IsOptional, IsMongoId} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class OrderTimeSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsMongoId()
  order?: string;
}
