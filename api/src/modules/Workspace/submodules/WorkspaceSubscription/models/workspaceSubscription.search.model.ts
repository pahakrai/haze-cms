import {IsMongoId, IsOptional, IsString, Matches} from 'class-validator';
import {BaseSearchModel} from 'src/core/models';

export class WorkspaceSubscriptionSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  @Matches(/^sub_/)
  stripeSubscriptionId?: string;

  @IsMongoId()
  @IsOptional()
  subscriptionPlan?: string;
}
