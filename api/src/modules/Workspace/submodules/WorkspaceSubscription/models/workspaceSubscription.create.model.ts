import {IsMongoId, IsOptional, IsString, Matches} from 'class-validator';

export class WorkspaceSubscriptionCreateModel {
  @IsMongoId()
  workspace: string;

  @IsString()
  @IsOptional()
  @Matches(/^sub_/)
  stripeSubscriptionId?: string;

  @IsMongoId()
  subscriptionPlan: string;

  @IsString()
  @IsOptional()
  status?: string;
}
