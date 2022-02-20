import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import {IsMongoId, IsOptional} from 'class-validator';

export class ProductSpecSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  product?: string;
}
