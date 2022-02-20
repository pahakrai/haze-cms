import {IsInt, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import {Type} from 'class-transformer';

export class ProductTypeSearchModel extends BaseSearchModel {
  @IsInt({each: true})
  @Type(() => Number)
  @IsOptional()
  statuses?: Array<number>;
}
