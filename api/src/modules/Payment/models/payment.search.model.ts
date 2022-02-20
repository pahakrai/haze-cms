import {IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import {IsMongoId} from 'class-validator';

export class PaymentSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsMongoId()
  order?: string;
}
