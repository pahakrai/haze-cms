import {BaseSearchModel} from 'src/core/models';
import {IsString, IsOptional} from 'class-validator';
export class SubscriptionPlanSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  code?: string;
}
