import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/subscriptionPlan.schemas';
import {SubscriptionPlanController} from './subscriptionPlan.controller';
import {SubscriptionPlanService} from './subscriptionPlan.service';
import {SubscriptionPlanResolver} from './subscriptionPlan.resolver';
import {SubscriptionItemModule} from './submodules/SubscriptionItem/subscriptionItem.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    SubscriptionItemModule
  ],
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService, SubscriptionPlanResolver],
  exports: [SubscriptionPlanService]
})
export class SubscriptionPlanModule {}
