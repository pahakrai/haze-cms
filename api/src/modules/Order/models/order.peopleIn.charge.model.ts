import {
  IsOptional,
  IsMongoId
  // IsInt,
  // IsDate,
  // ValidateNested
} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class OrderPeopleInChargeModel extends BaseSearchModel {
  @IsMongoId({each: true})
  @IsOptional()
  orderIds?: string[];

  @IsMongoId({each: true})
  @IsOptional()
  poepleInCharge?: string[];

  @IsMongoId()
  @IsOptional()
  isOrderIds?: boolean;
}
