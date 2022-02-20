import {ApiProperty} from '@nestjs/swagger';
import {IsMongoId, IsString, Matches} from 'class-validator';

export class WorkspaceSubscriptionSubscribeModel {
  @IsMongoId()
  @ApiProperty({description: 'subscription plan'})
  subscriptionPlan: string;

  @IsString()
  @Matches(/^price_/)
  @ApiProperty({description: 'stripe price id'})
  stripePriceId: string;

  @IsString()
  @Matches(/^pm_/)
  @ApiProperty({description: 'stripe payment method id'})
  paymentMethodId: string;
}
