import {IsMongoId, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class CheckoutSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  order?: string;
}
