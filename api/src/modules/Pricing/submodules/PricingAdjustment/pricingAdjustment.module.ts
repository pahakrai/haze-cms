import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/pricingAdjustment.schemas';
import {PricingAdjustmentService} from './pricingAdjustment.service';
import {PricingAdjustmentResolver} from './pricingAdjustment.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  providers: [PricingAdjustmentService, PricingAdjustmentResolver],
  exports: [PricingAdjustmentService]
})
export class PricingAdjustmentModule {}
